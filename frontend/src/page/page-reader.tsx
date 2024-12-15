import { UserContext } from "@/context/user-context";
import { getChapter } from "@/repositories/chapter-repository";
import {
  createComment,
  likeComment,
  listCommentByChapter,
  unlikeComment,
} from "@/repositories/comment-repository";
import { createHistory } from "@/repositories/history-repository";
import { Chapter } from "@/types/chapter-types";
import { Story } from "@/types/story-type";
import { ThumbUp, ThumbUpOffAlt } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Divider,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { comment } from "@/types/comment-type";

function SectionComment({
  storyId,
  chapterId,
}: {
  storyId?: string;
  chapterId?: string;
}) {
  const [listComment, setListComment] = useState<comment[]>([]);
  const [commentFormData, setCommentFormData] = useState<string>("");
  const { user } = useContext(UserContext);
  function Comment({
    username,
    body,
    likes = "0",
    isLiked = false,
    onLikeAction = () => {},
  }: {
    username: string;
    body: string;
    likes?: string;
    isLiked?: boolean;
    onLikeAction?: () => void;
  }) {
    return (
      <div className="flex">
        <div className="flex-grow">
          <Typography variant="body1">{username}</Typography>
          <Typography variant="body2">{body}</Typography>
        </div>
        <div className="flex flex-col items-center">
          <IconButton onClick={onLikeAction}>
            {isLiked ? <ThumbUp /> : <ThumbUpOffAlt />}
          </IconButton>
          <Typography variant="caption">{likes}</Typography>
        </div>
      </div>
    );
  }
  const fetchComments = async () => {
    console.log(storyId, chapterId);
    if (storyId && chapterId) {
      const data = await listCommentByChapter(storyId, chapterId)
        .then((res) => {
          if (res.ok) res.json().then(setListComment);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  function onCommentSubmit() {
    const data = commentFormData.trim();
    if (data.length == 0) {
      alert("Comment cannot be empty");
      return;
    }
    if (storyId && chapterId) {
      createComment(storyId, chapterId, { content: data }).then((res) => {
        if (res.ok) {
          alert("Comment submitted successfully");
          setCommentFormData("");
          fetchComments();
        }
      });
    } else {
      alert("Invalid story or chapter");
    }
  }

  useEffect(() => {
    fetchComments();
  }, [storyId]);

  return (
    <Accordion className="my-8">
      <AccordionSummary>Bình luận {listComment.length}</AccordionSummary>
      <AccordionDetails>
        <div>
          <TextField
            variant="standard"
            className="w-full"
            label="Your comment on this chapter?"
            value={commentFormData}
            onChange={(e) => setCommentFormData(e.target.value)}
          />
          <Button
            variant="contained"
            className="ml-auto block my-4"
            onClick={onCommentSubmit}
          >
            Submit
          </Button>
        </div>
        {listComment.map((c) => (
          <div key={c._id}>
            <Comment
              username={c.author.username}
              body={c.content}
              likes={c.likes.length.toString()}
              isLiked={c.likes.includes(user?._id ?? "")}
              onLikeAction={() => {
                if (!c.likes.includes(user?._id ?? "")) {
                  likeComment(c._id).then((res) => {
                    if (res.ok) fetchComments();
                  });
                } else {
                  unlikeComment(c._id).then((res) => {
                    if (res.ok) fetchComments();
                  });
                }
              }}
            />
            <Divider className="my-4" />
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

export function PageReader() {
  const [chapter, setChapter] = useState<Chapter>();
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    getChapter(chapterId ?? "").then((res) => {
      if (res.ok) {
        res.json().then(setChapter);
      } else navigate("/404");
    });
  }, []);

  useEffect(() => {
    if (user && chapter && chapterId) {
      createHistory(
        // @ts-expect-error
        chapter?.StoryId,
        chapterId ?? ""
      ).then((res) => {
        if (!res.ok) {
          console.error("Failed to create history");
        }
      });
    }
  }, [chapter, user, chapterId]);

  return (
    <Container maxWidth="sm">
      <div>
        <Link
          component={RouterLink}
          to={`/truyen/${chapter?.StoryId}`}
          className="decoration-transparent text-inherit"
        >
          Quay lại
        </Link>
        <Typography variant="h4">Chapter {chapter?.ChapterNumber}</Typography>
        <Typography variant="h5">{chapter?.Title}</Typography>
      </div>
      <Divider className="my-4" />
      <div>
        <Markdown>{chapter?.Content}</Markdown>
      </div>
      <SectionComment
        storyId={chapter?.StoryId?.toString()}
        chapterId={chapterId}
      />
    </Container>
  );
}

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import SaveTweetModal from "./SaveTweetModal";

import axios from "axios";
import { TWEETS_PATH } from "../../shared/constants";

const TweetDetailedView = ({
  tweet: { username, text, displayName, datePosted, url },
}) => (
  <div>
    <p>
      <strong>{displayName}</strong> @{username}
    </p>
    <p>{text}</p>
    <p>{datePosted}</p>
    <a href={url} target="_blank" rel="noreferrer">
      {url}
    </a>
  </div>
);

interface TweetDetails {
  text: string;
  url: string;
  username: string;
  displayName: string;
  datePosted: string;
}

interface RowProps {
  tweetId: string;
  tweetText: string;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTweet: React.Dispatch<React.SetStateAction<string | null>>;
}

const Row: React.FC<RowProps> = ({
  tweetId,
  tweetText,
  setModalOpen,
  setSelectedTweet,
}) => {
  const [open, setOpen] = useState(false);
  const tweetTextPreview = tweetText.slice(0, 100);
  const [tweetDetails, setTweetDetails] = useState<TweetDetails | null>(null);

  const fetchTweetDetails = async () => {
    const { data } = await axios.get(`${TWEETS_PATH}/details/${tweetId}`, {
      timeout: 2000,
    });
    setTweetDetails(data);
  };

  useEffect(() => {
    if (open) {
      fetchTweetDetails();
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBookmarkPress = () => {
    setModalOpen(true);
    setSelectedTweet(tweetId);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {tweetText.length > 100 ? `${tweetTextPreview}...` : tweetTextPreview}
        </TableCell>
        <TableCell align="right">
          <BookmarkBorderIcon
            sx={{ cursor: "pointer" }}
            onClick={handleBookmarkPress}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Tweet Details
              </Typography>
              {tweetDetails && <TweetDetailedView tweet={tweetDetails} />}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

interface ShortTweet {
  id: string;
  text: string;
}

interface TableProps {
  tweets: ShortTweet[];
}

const TweetTable: React.FC<TableProps> = ({ tweets }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTweet, setSelectedTweet] = useState<string | null>(null);

  return (
    <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <strong>Tweet Text Preview</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Save this tweet</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <SaveTweetModal
          open={modalOpen}
          setOpen={setModalOpen}
          tweetId={selectedTweet}
        />
        <TableBody>
          {tweets?.map((tweet) => (
            <Row
              key={tweet.id}
              tweetId={tweet.id}
              tweetText={tweet.text}
              setModalOpen={setModalOpen}
              setSelectedTweet={setSelectedTweet}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TweetTable;

"use client";
import { useState, useEffect, Fragment } from "react";
import { useSearchParams } from "next/navigation";

import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CardActionArea,
} from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { doc, collection, getDoc } from "firebase/firestore";
import db from "@/firebase";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);

  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  console.log("search: " + search);

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

      const colRef = doc(
        collection(doc(collection(db, "users"), user.id), "flashcardSets"),
        search
      );
      const docs = await getDoc(colRef);

      if (docs.exists()) {
        const collections = docs.data().flashcards || [];
        setFlashcards(collections);
      }
    }
    getFlashcard();
  }, [user, search]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <Container
      maxWidth="100vw"
      sx={{ backgroundColor: "white", color: "black" }}
    >
      {flashcards.length > 0 ? (
        <Fragment>
          <Typography sx={{textTransform: 'capitalize'}} my={2} variant="h4" textAlign={"center"}>
            {search.toLocaleLowerCase()} flashcards
          </Typography>

          <Grid container spacing={3} sx={{ mt: 4 }}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent>
                      <Box
                        sx={{
                          perspective: "1000px",
                          "& > div": {
                            transition: "transform 0.6s",
                            transformStyle: "preserve-3d",
                            position: "relative",
                            width: "100%",
                            backfaceVisibility: "hidden",
                            height: "200px",
                            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                            transform: flipped[index]
                              ? "rotateY(180deg)"
                              : "rotateY(0deg)",
                          },
                          "& > div > div": {
                            position: "absolute",
                            boxSizing: "border-box",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 2,
                          },
                          "& > div > div:nth-of-type(2)": {
                            transform: "rotateY(180deg)",
                          },
                        }}
                      >
                        <div>
                          <div>
                            <Typography variant="h5" component="div">
                              {flashcard.front}
                            </Typography>
                          </div>
                          <div>
                            <Typography variant="h5" component="div">
                              {flashcard.back}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Fragment>
      ) : (
        <Typography m={4} variant="h5">
          No Flashcards To display
        </Typography>
      )}
    </Container>
  );
}

"use client";
import { useState, useEffect, Fragment } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { doc, getDoc, collection, setDoc } from "firebase/firestore";
import db from "@/firebase";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcardSets || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <Container maxWidth="md">
      {flashcards.length > 0 ? (
        <Fragment>
          <Typography textAlign={'center'} my={2} variant="h4"> Saved Flashcard Sets</Typography>

          <Grid container spacing={3} sx={{ mt: 4 }}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} large={4} key={index}>
                <Card>
                  <CardActionArea
                    onClick={() => handleCardClick(flashcard.name)}
                  >
                    <CardContent>
                      <Typography sx={{textTransform: 'capitalize'}} variant="h5" component="div">
                        {flashcard.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Fragment>
      ) : (
        <Typography m={4} variant="h3">No Flashcards To display</Typography>
      )}
    </Container>
  );
}

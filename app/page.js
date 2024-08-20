"use client";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Stack,
} from "@mui/material";
import { SignedOut, SignedIn, UserButton, useUser } from "@clerk/nextjs";
import getStripe from "@/utils/get-stripe";

export default function Home() {
  const { user } = useUser();
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "whitesmoke", color: "black" }}
    >
      <Toolbar sx={{ backgroundColor: "whitesmoke", color: "black" }}>
        <Typography fontWeight={'bold'} variant="h6" style={{ flexGrow: 1 }}>
          AI Flashcard Study Tool
        </Typography>

        <SignedOut>
          <Stack flexDirection={'row'} columnGap={2}>
            <Button variant="contained" color="primary" href="/sign-in">
              Login
            </Button>
            <Button variant="contained" color="primary" href="/sign-up">
              Sign Up
            </Button>
          </Stack>
        </SignedOut>
        <SignedIn>
          <Stack direction={"row"} spacing={2}>
            {user && <Typography> Welcome {user.firstName} !</Typography>}
            <UserButton />
          </Stack>
        </SignedIn>
      </Toolbar>
      {/* Hero Section */}
      <Box sx={{ my: 4, justifyContent: "center", alignItems: "center" }}>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            textAlign={"center"}
          >
            Welcome to the AI Flashcard Study Tool
          </Typography>
          <Typography variant="h5" gutterBottom textAlign={"center"}>
            The easiest way to create flashcards from your study material
          </Typography>
          <Typography display={ user ? 'none' : 'flex'} color={"darkblue"} variant="h6" mt={2} fontWeight={'bold'}>
            Login to Generate and View Your Flashcards
          </Typography>
          <Stack display={!user ? "none" : "flex"} spacing={2} mt={2}>
            <Button
              variant="contained"
              color="primary"
              href="/generate_flashcards_ui"
            >
              Generate Flashcards
            </Button>
            <Button href="/flashcards" variant="contained" color="primary">
              View Your Existing Flashcards
            </Button>
          </Stack>
        </Stack>
      </Box>
      {/* Features Section */}
      <Box sx={{ my: 6, mx: 4 }}>
        <Typography
          mb={4}
          variant="h4"
          component="h2"
          gutterBottom
          textAlign={"center"}
          sx={{ textDecoration: "underline" }}
        >
          Features
        </Typography>
        <Grid container spacing={4}>
          {/* Feature 1 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                backgroundColor: "lightgray",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Easy to Use
              </Typography>
              <Typography>
                All you have to do is enter what topic you are studying, and let
                the AI Flashcard Study Tool do the rest!
              </Typography>
            </Box>
          </Grid>
          {/* Feature 2 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                backgroundColor: "lightgray",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Smart Flashcards
              </Typography>
              <Typography>
                Our AI intelligently analyses your study topic and breaks it
                into concise flashcards, perfect for studying!
              </Typography>
            </Box>
          </Grid>

          {/* Feature 3 */}
          <Grid item xs={12} md={4} border={"black"}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                backgroundColor: "lightgray",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Accessible Anywhere
              </Typography>
              <Typography>
                Access all you flashcards from any device, at any time. Study on
                the go!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* Donate Section */}
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6} lg={3}>
            <Box
              sx={{
                p: 3,
                border: "4px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                backgroundColor: "rose",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Buy us a Coffee ($10)
              </Typography>

              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Donate
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </AppBar>
  );
}

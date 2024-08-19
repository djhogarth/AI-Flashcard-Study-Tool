"use client";
import React from "react";
import { Box, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <AppBar position="static" sx={{ background: "whitesmoke", color: "black" }}>
      <Toolbar>
        
        <Typography ml={4} color={"black"} variant="h6" sx={{ flexGrow: 1 }}>
          AI Flashcard Study Tool
        </Typography>
        <Link href="/sign-in" passHref>
          <Button variant="contained" color="success">
            Login
          </Button>
        </Link>

        <Link href="/sign-up" passHref>
          <Button sx={{mx: 2}} variant="contained" color="inherit">
            Sign Up
          </Button>
        </Link>
      </Toolbar>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ textAlign: "center", my: 1 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        <SignIn />
      </Box>
    </AppBar>
  );
}

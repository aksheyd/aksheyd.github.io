"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="flex justify-center items-center py-24 bg-muted/50">
      <Card className="max-w-xl w-full shadow-lg">
        <CardHeader>
          <CardTitle>About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">
            Hi, I'm Akshey Deokule.
          </p>
        </CardContent>
      </Card>
    </section>
  );
} 
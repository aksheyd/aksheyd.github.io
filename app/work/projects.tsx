export type Project = {
    id: number;
    name: string;
    bio: string;
    desc: string;
    date: string;
    link: string;
    images: string[];
}

let projects: Project[] = [
    {
        id: 0,
        name: "What's Up",
        bio: "Learn your local laws!",
        desc: "Developed as part of Data Driven Hackathon. Django with SQLite deployed on fly.io. FSLite for DB replication and Fly.io for loadbalancing. Running 3 replicas.",
        date: "March 2025",
        link: "https://github.com/aksheyd/whatsup",
        images: [
            ""
        ]
    },

    {   
        id: 1,
        name: "Destroy The Wormhole",
        bio: "A 'goldspike', endless space runner game with cloning.",
        desc: "Developed the game in two weeks with Unity using C#. Click the link to play the game online!",
        date: "February 2025",
        link: "/destroy-the-wormhole",
        images: [
            "https://cdn.worldvectorlogo.com/logos/unity-technologies-logo.svg",
            "https://cdn.worldvectorlogo.com/logos/c--4.svg",
        ]
    },
    // {
    //     name: "Game Engine",
    //     bio: "First of its kind, multithreaded game engine.",
    //     desc: "in progress, check repo for updates...",
    //     date: "January 2025",
    //     link: "",
    //     images: [
    //     ]
    // },
    {   
        id: 2,
        name: "Legend of Zelda",
        bio: "A remake of the first dungeon of the original NES Legend of Zelda game",
        desc: "Collaborated with a peer to develop the game in Unity using C#. The game features the first dungeon from the original NES version. Click the link to play the game online!",
        date: "January 2025",
        link: "/legend-of-zelda",
        images: [
            "https://cdn.worldvectorlogo.com/logos/unity-technologies-logo.svg",
            "https://cdn.worldvectorlogo.com/logos/c--4.svg",
            "https://cdn.worldvectorlogo.com/logos/adobe-photoshop-2.svg",

        ]
    },
    {
        id: 3,
        name: "Gemini AI ASL Translator",
        bio: "An American Sign Language (ASL) Translator utilizing Google's Gemini API",
        desc: "Collaborated with 2 team members to create a React and Flask web app to allow users to record videos signing and translate American Sign Language (ASL) into English via Gemini 1.5’s Video API. Submitted as part of MHacks x Google Hackathon",
        date: "March 2024",
        link: "https://devpost.com/software/gemini-asl-translator",
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/2560px-Google_Gemini_logo.svg.png",
            "https://cdn.worldvectorlogo.com/logos/flask.svg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmKtrnxElpqw3AExKXPWWBulcwjlvDJa1Q&s",

        ]
    },
    {
        id: 4,
        name: "Personal Portfolio",
        bio: "A website application leveraging modern web technologies",
        desc: "Created using Next.js, React, and Typescript, featuring GSAP, tsParticles, Tailwind CSS, and more to come! Deployed via Github Pages.",
        date: "November 2024 - March 2024",
        link: "https://github.com/aksheyd/aksheyd.github.io",
        images: [
            "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg",
            "https://cdn.worldvectorlogo.com/logos/react-2.svg",
            "https://miro.medium.com/v2/resize:fit:700/1*eZX21KaXanUokLYelxNURg.png",
            "https://www.cdnlogo.com/logos/t/34/tailwind-css.svg",
        ]
    },
    {
        id: 5,
        name: "NBA Neural Network Finals Predictor",
        bio: "A Neural Network utilizing Python libraries to predict NBA Champions",
        desc: "Trained a neural network to predict the chance of NBA teams to make the finals based on championship data from over 25 years of previous seasons utilizing pandas, the NBA API, and tensorflow with scikit-learn",
        date: "May 2023",
        link: "https://github.com/aksheyd/ArtificialNeuralNetwork-NBAFinals",
        images: [
            "https://cdn.worldvectorlogo.com/logos/python-3.svg",
            "https://geo-python.github.io/site/2019/_images/pandas_logo.png",
            "https://seeklogo.com/images/T/tensorflow-logo-AE5100E55E-seeklogo.com.png",
            "https://scikit-learn.org/stable/_static/scikit-learn-logo-small.png",
            "https://cdn.worldvectorlogo.com/logos/nba-2.svg",
        ]
    }
];

export default projects;
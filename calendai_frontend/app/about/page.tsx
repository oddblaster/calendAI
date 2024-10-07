import { MessageSquare, Book, Cpu, UsersRound } from "lucide-react";

const About = () => {
    return(
    <div className="fixed overflow-y-auto flex flex-col h-screen bg-gradient-to-t from-[#FFA17F] to-[#00223E] text-white">
        {/* Header */}
      <header className="font-outfit mt-6 text-center mb-12">
        <h1 className="text-5xl font-bold bg-text-gradient-animated animate-gradient-text bg-clip-text text-transparent bg-[length:200%_200%]">CalendAI</h1>
        <p className="font-outfit mt-4 text-xl font-thin italic text-white">Focus your day. Empower your mind.</p>
      </header>

      {/* Mission Statement */}
      <section className="mb-12 bg-gradient-to-b from-black/50 to-black/50 p-4 rounded-lg mr-12 backdrop-blur-3xl shadow-lg">
            <span className="flex flex-row items-center text-3xl font-semibold text-[#FFA17F]">
            <MessageSquare className="mr-2"></MessageSquare> Mission Statement</span>
        <p className="mt-4 text-lg text-white leading-relaxed">
          At CalendAI, we empower individuals with ADHD and other concentration-related disorders to take control of their time and tasks 
          through intuitive, AI-driven organization tools designed to enhance focus and productivity.
        </p>
      </section>

      {/* Our Story */}
      <section className="mb-12 bg-gradient-to-b from-black/50 to-black/30 p-4 rounded-lg mr-12 backdrop-blur-3xl shadow-lg ">
      <span className="flex flex-row items-center text-3xl font-semibold text-[#FFA17F]">
      <Book className="mr-2"/> Our Story</span>
        <p className="mt-4 text-lg text-white leading-relaxed">
          Currently, an estimated 11% of adolescents in the United States have been diagnosed with ADHD (Attention Deficit Hypersensitivity Disorder). 
          While this number may seem like another statistic, for each member of our group who has at least one close friend with ADHD, 
          we are all keenly aware of the detrimental effects that the disorder can have on productivity. 
          CalendAI is our attempt at combating these effects by breaking goals up into a roadmap of actionable tasks. 
          With adaptive scheduling, task breakdowns, and seamless note-taking, our service helps users stay on track 
          and achieve their goals with confidence and ease, turning setbacks to solutions.
        </p>
      </section>

      {/* Tech Stack */}
      <section className="mb-12 bg-gradient-to-b from-black/40 to-black/20 p-4 rounded-lg mr-12 backdrop-blur-3xl shadow-lg">
      <span className="flex flex-row items-center text-3xl font-semibold text-[#FFA17F]">
      <Cpu className="mr-2"/>Tech Stack</span>
        <div className="items-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
          {[
            { name: "Tailwind CSS", logo: "/tailwindcss.png" },
            { name: "React", logo: "/react.png" },
            { name: "Next.js", logo: "/nextjs.png" },
            { name: "Node.js", logo: "/nodejs.png" },
            { name: "Google Calendar API", logo: "/google-calendar.png" },
            { name: "OpenAI", logo: "/openai.png" },
            { name: "FastAPI", logo: "/fastapi.png" }
          ].map((tech, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={tech.logo} alt={tech.name} className="mb-2 w-20 aspect-auto"/>
              <p className="text-center text-lg font-semibold text-white/90">{tech.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Creators */}
      <section className="bg-gradient-to-b from-black/20 to-black/20 p-4 mb-12 rounded-lg mr-12 backdrop-blur-3xl shadow-lg ">
      <span className="flex flex-row items-center text-3xl font-semibold text-[#FFA17F]">
      <UsersRound className="mr-2"/>Creators</span>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Chuyang Zhang", github: "https://github.com/oddblaster" },
            { name: "Eren Chang", github: "https://github.com/RamenBuddha" },
            { name: "Jack Gordon", github: "https://github.com/Warphi" },
            { name: "Hemanshu Boppana", github: "https://github.com/hboppana" }
          ].map((creator, index) => (
            <div key={index} className="p-4 bg-white shadow-md rounded-lg text-center mb-12 mr-12">
              <h3 className="text-lg font-semibold text-gray-800">{creator.name}</h3>
              <a href={creator.github} className="text-blue-600 mt-2 block" target="_blank" rel="noopener noreferrer">
                GitHub Profile
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
    )
}

export default About;
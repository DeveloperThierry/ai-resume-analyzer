import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { resumes } from "../../constants";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    { name: "description", content: "Land your dream job!" },
  ];
}

export default function Home() {
  const {isLoading, auth} = usePuterStore()
  const navigate = useNavigate()
  useEffect(()=>{
      if(!auth.isAuthenticated) navigate('/auth?next=/')
  },[auth.isAuthenticated])
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar/>
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track your Applications & Resume Ratings</h1>
        <h2>Review your submissions and check your AI powered feedback</h2>
      </div>
    {resumes && resumes.length > 0 && (
      <div className="resumes-section">
        {resumes.map((resume: Resume)=> (
      <ResumeCard resume={resume} key={resume.id}/>
    ))}
      </div>
    )}
        </section>

  </main>;
}

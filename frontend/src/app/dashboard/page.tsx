"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getAllBlogs } from "@/services/blog";
import { getAllExperiences } from "@/services/experience";
import { deleteProject, getAllProjects } from "@/services/project";
import { getAllSkills } from "@/services/skill";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();

  // State for data
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const { toast } = useToast();


  // delete project
  const handleDelete = async (id: string) => {
    const res = await deleteProject(id);
    if (res.statusCode === 200) {
      toast({
        title: "Success",
        description: res.message,
      });
      router.refresh();
    } else {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [blogsData, projectsData, experiencesData, skillsData] =
          await Promise.all([
            getAllBlogs(),
            getAllProjects(),
            getAllExperiences(),
            getAllSkills(),
          ]);
        setBlogs(
          (blogsData || []).map((b: any) => ({ ...b, id: b.id || b._id }))
        );
        setProjects(
          (projectsData || []).map((p: any) => ({ ...p, id: p.id || p._id }))
        );
        setExperiences(
          (experiencesData || []).map((e: any) => ({ ...e, id: e.id || e._id }))
        );
        setSkills(
          (skillsData || []).map((s: any) => ({ ...s, id: s.id || s._id }))
        );
      } catch (error) {
        // handle error, e.g. show toast
      }
    }
    fetchData();
  }, []);

  // Table helpers
  const renderTable = (
    data: any[],
    columns: { key: string; label: string }[],
    type: string
  ) => (
    <div className="overflow-x-auto rounded-lg border mb-8">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col: { key: string; label: string }) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item: any, idx: number) => (
            <tr key={idx}>
              {columns.map((col: { key: string; label: string }) => (
                <td
                  key={col.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {Array.isArray(item[col.key])
                    ? item[col.key].join(", ")
                    : item[col.key]}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() =>
                    router.push(`/dashboard/${type}/edit/${item.id ?? idx}`)
                  }
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Cards for counts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <Card className="shadow-md border-0 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-bold text-primary">
              {blogs.length}
            </span>
          </CardContent>
        </Card>
        <Card className="shadow-md border-0 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-bold text-primary">
              {projects.length}
            </span>
          </CardContent>
        </Card>
        <Card className="shadow-md border-0 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Experiences</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-bold text-primary">
              {experiences.length}
            </span>
          </CardContent>
        </Card>
        <Card className="shadow-md border-0 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-bold text-primary">
              {skills.length}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Tables for details */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-bold mb-4 text-primary">Blogs</h2>
        {renderTable(
          blogs,
          [
            { key: "title", label: "Title" },
            { key: "author", label: "Author" },
            { key: "tags", label: "Tags" },
          ],
          "blog"
        )}
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-bold mb-4 text-primary">Projects</h2>
        {renderTable(
          projects,
          [
            { key: "name", label: "Name" },
            { key: "description", label: "Description" },
            { key: "technologies", label: "Technologies" },
          ],
          "project"
        )}
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-bold mb-4 text-primary">Experiences</h2>
        {renderTable(
          experiences,
          [
            { key: "title", label: "Title" },
            { key: "company", label: "Company" },
            { key: "location", label: "Location" },
          ],
          "experience"
        )}
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-bold mb-4 text-primary">Skills</h2>
        {renderTable(
          skills,
          [
            { key: "name", label: "Name" },
            { key: "level", label: "Level" },
            { key: "yearsOfExperience", label: "Years of Experience" },
          ],
          "skill"
        )}
      </div>
    </div>
  );
}

interface Project {
    id: number;
    name: string;
    // Add other project properties
   }
   
   interface ProjectSearchProps {
    onProjectSelect?: (project: Project) => void;
   }
   
   const ProjectSearch: React.FC<ProjectSearchProps> = ({ onProjectSelect }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [projects, setProjects] = useState<Project[]>([]);
    const [page, setPage] = useState<number>(0);
   
    const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault();
      const response = await axios.get<{content: Project[]}>(`/api/projects/search?query=${searchTerm}&page=${page}&size=10`);
      setProjects(response.data.content);
    };
   
    return (
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            placeholder="Search projects..."
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Search
          </button>
        </form>
   
        <div className="mt-4">
          {projects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project}
              onClick={() => onProjectSelect?.(project)}
            />
          ))}
        </div>
      </div>
    );
   };
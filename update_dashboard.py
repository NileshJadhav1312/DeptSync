import re

with open('d:/on going projects/Research Project/Research Project 1/frontend/src/pages/student/StudentDashboard.jsx', 'r') as f:
    content = f.read()

# 1. Imports
content = re.sub(r'import ActivitiesTable from "../../components/teacher/ActivitiesTable";\nimport ActivityFormModal from "../../components/teacher/ActivityFormModal";\nimport AchievementsTable from "../../components/student/StudentAchievementsTable";\nimport AchievementFormModal from "../../components/student/StudentAchievementFormModal";',
'''import ActivitiesTable from "../../components/shared/ActivitiesTable";
import ActivityFormModal from "../../components/shared/ActivityFormModal";
import AchievementsTable from "../../components/shared/AchievementsTable";
import AchievementFormModal from "../../components/shared/AchievementFormModal";
import JournalPublicationsTable from "../../components/shared/JournalPublicationsTable";
import JournalPublicationFormModal from "../../components/shared/JournalPublicationFormModal";
import PatentsTable from "../../components/shared/PatentsTable";
import PatentFormModal from "../../components/shared/PatentFormModal";
import CopyrightsTable from "../../components/shared/CopyrightsTable";
import CopyrightFormModal from "../../components/shared/CopyrightFormModal";
import { GrantsTable, GrantFormModal } from "../../components/shared/GrantsItems";''', content)

content = re.sub(r'import ConferencePublicationsTable from "../../components/teacher/ConferencePublicationsTable";\nimport ConferencePublicationFormModal from "../../components/teacher/ConferencePublicationFormModal";',
'''import ConferencePublicationsTable from "../../components/teacher/ConferencePublicationsTable";
import ConferencePublicationFormModal from "../../components/teacher/ConferencePublicationFormModal";''', content)

content = re.sub(r'import ProjectsTable from "../../components/teacher/ProjectsTable";\nimport ProjectFormModal from "../../components/teacher/ProjectFormModal";',
'''import ProjectsTable from "../../components/shared/ProjectsTable";
import ProjectFormModal from "../../components/shared/ProjectFormModal";''', content)

content = re.sub(r'import { getProjects, createProject, updateProject, deleteProject } from "../../services/research";',
'''import { getProjects, createProject, updateProject, deleteProject, getJournalPublications, createJournalPublication, updateJournalPublication, deleteJournalPublication, getPatents, createPatent, updatePatent, deletePatent, getCopyrights, createCopyright, updateCopyright, deleteCopyright, getGrants, createGrant, updateGrant, deleteGrant } from "../../services/research";''', content)

# 2. State Variables
state_vars = '''
  const [journals, setJournals] = useState([]);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);

  const [patents, setPatents] = useState([]);
  const [isPatentModalOpen, setIsPatentModalOpen] = useState(false);
  const [editingPatent, setEditingPatent] = useState(null);

  const [copyrights, setCopyrights] = useState([]);
  const [isCopyrightModalOpen, setIsCopyrightModalOpen] = useState(false);
  const [editingCopyright, setEditingCopyright] = useState(null);

  const [grants, setGrants] = useState([]);
  const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);
  const [editingGrant, setEditingGrant] = useState(null);
'''
content = re.sub(r'const \[projects, setProjects\] = useState\(\[\]\);\n  const \[isProjectModalOpen, setIsProjectModalOpen\] = useState\(false\);\n  const \[editingProject, setEditingProject\] = useState\(null\);',
    'const [projects, setProjects] = useState([]);\n  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);\n  const [editingProject, setEditingProject] = useState(null);\n' + state_vars, content)

# 3. Route Flags
route_flags = '''
  const isJournals = section === "journals";
  const isPatents = section === "patents";
  const isCopyrights = section === "copyrights";
  const isGrants = section === "grants";
'''
content = re.sub(r'const isProjects = section === "projects";', 'const isProjects = section === "projects";\n' + route_flags, content)

# 4. useEffect
use_effect = '''      fetchJournals();
      fetchPatents();
      fetchCopyrights();
      fetchGrants();'''
content = re.sub(r'fetchProjects\(\);\n    }', use_effect + '\\n    }', content)

# 5. Fetch Functions
fetch_funcs = '''
  const fetchJournals = async () => { try { const resp = await getJournalPublications({ studentId: user.id }); setJournals(resp.journalPublications || []); } catch (err) { console.error(err); } };
  const fetchPatents = async () => { try { const resp = await getPatents({ studentId: user.id }); setPatents(resp.patents || []); } catch (err) { console.error(err); } };
  const fetchCopyrights = async () => { try { const resp = await getCopyrights({ studentId: user.id }); setCopyrights(resp.copyrights || []); } catch (err) { console.error(err); } };
  const fetchGrants = async () => { try { const resp = await getGrants({ studentId: user.id }); setGrants(resp.grants || []); } catch (err) { console.error(err); } };
'''
content = re.sub(r'const fetchProjects = async \(\) => {.*?};', r'\g<0>\n' + fetch_funcs, content, flags=re.DOTALL)

# 6. Handlers
handlers = '''
  const handleCreateJournal = async (payload) => {
    try {
      const jPayload = { ...payload, studentId: user.id, studentName: profileData?.firstName ? ${profileData.firstName} .trim() : user.name, departmentId: profileData?.departmentId, departmentName: profileData?.departmentName, createdByModel: "Student" };
      if (editingJournal) await updateJournalPublication(editingJournal._id, jPayload);
      else await createJournalPublication(jPayload);
      setEditingJournal(null); fetchJournals();
    } catch (err) { console.error(err); }
  };
  const handleDeleteJournal = async (item) => { if (window.confirm("Delete journal?")) { try { await deleteJournalPublication(item._id); fetchJournals(); } catch (err) { console.error(err); } } };

  const handleCreatePatent = async (payload) => {
    try {
      const pPayload = { ...payload, studentId: user.id, studentName: profileData?.firstName ? ${profileData.firstName} .trim() : user.name, departmentId: profileData?.departmentId, departmentName: profileData?.departmentName, createdByModel: "Student" };
      if (editingPatent) await updatePatent(editingPatent._id, pPayload);
      else await createPatent(pPayload);
      setEditingPatent(null); fetchPatents();
    } catch (err) { console.error(err); }
  };
  const handleDeletePatent = async (item) => { if (window.confirm("Delete patent?")) { try { await deletePatent(item._id); fetchPatents(); } catch (err) { console.error(err); } } };

  const handleCreateCopyright = async (payload) => {
    try {
      const cPayload = { ...payload, studentId: user.id, studentName: profileData?.firstName ? ${profileData.firstName} .trim() : user.name, departmentId: profileData?.departmentId, departmentName: profileData?.departmentName, createdByModel: "Student" };
      if (editingCopyright) await updateCopyright(editingCopyright._id, cPayload);
      else await createCopyright(cPayload);
      setEditingCopyright(null); fetchCopyrights();
    } catch (err) { console.error(err); }
  };
  const handleDeleteCopyright = async (item) => { if (window.confirm("Delete copyright?")) { try { await deleteCopyright(item._id); fetchCopyrights(); } catch (err) { console.error(err); } } };

  const handleCreateGrant = async (payload) => {
    try {
      const gPayload = { ...payload, studentId: user.id, studentName: profileData?.firstName ? ${profileData.firstName} .trim() : user.name, departmentId: profileData?.departmentId, departmentName: profileData?.departmentName, createdByModel: "Student" };
      if (editingGrant) await updateGrant(editingGrant._id, gPayload);
      else await createGrant(gPayload);
      setEditingGrant(null); fetchGrants();
    } catch (err) { console.error(err); }
  };
  const handleDeleteGrant = async (item) => { if (window.confirm("Delete grant?")) { try { await deleteGrant(item._id); fetchGrants(); } catch (err) { console.error(err); } } };
'''
content = re.sub(r'const handleDeleteProject = async \(item\) => {.*?};', r'\g<0>\n' + handlers, content, flags=re.DOTALL)

# 7. Stats update
stats_update = '''
    { title: "Journals", value: journals.length, helper: "Journal Papers", onClick: () => navigate("/student/journals"), className: "cursor-pointer hover:shadow-lg hover:border-emerald-300 transition-all border-l-4 border-l-emerald-500 shadow-sm" },
    { title: "Patents", value: patents.length, helper: "Filed Patents", onClick: () => navigate("/student/patents"), className: "cursor-pointer hover:shadow-lg hover:border-indigo-300 transition-all border-l-4 border-l-indigo-500 shadow-sm" },
    { title: "Copyrights", value: copyrights.length, helper: "Registered Copyrights", onClick: () => navigate("/student/copyrights"), className: "cursor-pointer hover:shadow-lg hover:border-orange-300 transition-all border-l-4 border-l-orange-500 shadow-sm" },
    { title: "Grants", value: grants.length, helper: "Research Grants", onClick: () => navigate("/student/grants"), className: "cursor-pointer hover:shadow-lg hover:border-green-300 transition-all border-l-4 border-l-green-500 shadow-sm" }
'''
content = re.sub(r'const stats = \[.*?\];', r'const stats = [\g<0>'.replace('];', ', ' + stats_update.strip() + '\n  ];')[14:], content, flags=re.DOTALL)

# 8. Modals UI
modals_ui = '''
      <JournalPublicationFormModal isOpen={isJournalModalOpen} onClose={() => setIsJournalModalOpen(false)} onSubmit={handleCreateJournal} initialData={editingJournal} />
      <PatentFormModal isOpen={isPatentModalOpen} onClose={() => setIsPatentModalOpen(false)} onSubmit={handleCreatePatent} initialData={editingPatent} />
      <CopyrightFormModal isOpen={isCopyrightModalOpen} onClose={() => setIsCopyrightModalOpen(false)} onSubmit={handleCreateCopyright} initialData={editingCopyright} />
      <GrantFormModal isOpen={isGrantModalOpen} onClose={() => setIsGrantModalOpen(false)} onSubmit={handleCreateGrant} initialData={editingGrant} />
'''
content = re.sub(r'<ProjectFormModal.*?\/>', r'\g<0>\n' + modals_ui, content, flags=re.DOTALL)

# 9. Tables UI
tables_ui = '''
      {isJournals && <JournalPublicationsTable journals={journals} onEdit={(j) => { setEditingJournal(j); setIsJournalModalOpen(true); }} onDelete={handleDeleteJournal} />}
      {isPatents && <PatentsTable patents={patents} onEdit={(p) => { setEditingPatent(p); setIsPatentModalOpen(true); }} onDelete={handleDeletePatent} />}
      {isCopyrights && <CopyrightsTable copyrights={copyrights} onEdit={(c) => { setEditingCopyright(c); setIsCopyrightModalOpen(true); }} onDelete={handleDeleteCopyright} />}
      {isGrants && <GrantsTable grants={grants} onEdit={(g) => { setEditingGrant(g); setIsGrantModalOpen(true); }} onDelete={handleDeleteGrant} />}
'''
content = re.sub(r'\{isProjects && \(.*?<\/ProjectsTable>\n\s*\)}', r'\g<0>\n' + tables_ui, content, flags=re.DOTALL)

# Fix title conditions
content = re.sub(r'title=\{isAchievements \? "My Achievements" : isAcademics \? "Academics" : isConferences \? "Conference Publications" : isProjects \? "My Projects" : "Student Dashboard"\}',
    'title={isAchievements ? "My Achievements" : isAcademics ? "Academics" : isConferences ? "Conference Publications" : isProjects ? "My Projects" : isJournals ? "Journal Publications" : isPatents ? "My Patents" : isCopyrights ? "My Copyrights" : isGrants ? "My Grants" : "Student Dashboard"}', content)

# Fix actions button conditions
actions_ui = '''      ) : isJournals ? (
        <button className="bg-white text-xs sm:text-sm px-3 sm:px-4 py-2 text-black" onClick={() => { setEditingJournal(null); setIsJournalModalOpen(true) }}>Add Journal</button>
      ) : isPatents ? (
        <button className="bg-white text-xs sm:text-sm px-3 sm:px-4 py-2 text-black" onClick={() => { setEditingPatent(null); setIsPatentModalOpen(true) }}>Add Patent</button>
      ) : isCopyrights ? (
        <button className="bg-white text-xs sm:text-sm px-3 sm:px-4 py-2 text-black" onClick={() => { setEditingCopyright(null); setIsCopyrightModalOpen(true) }}>Add Copyright</button>
      ) : isGrants ? (
        <button className="bg-white text-xs sm:text-sm px-3 sm:px-4 py-2 text-black" onClick={() => { setEditingGrant(null); setIsGrantModalOpen(true) }}>Add Grant</button>
'''
content = re.sub(r'\) : isProjects \? \(\s*<button.*?Add Project\n\s*<\/button>', r'\g<0>\n' + actions_ui, content, flags=re.DOTALL)

# Hide main dashboard sections when viewing specific tabs
content = re.sub(r'!isAchievements && !isActivities && !isAcademics && !isConferences', '!isAchievements && !isActivities && !isAcademics && !isConferences && !isProjects && !isJournals && !isPatents && !isCopyrights && !isGrants', content)


with open('d:/on going projects/Research Project/Research Project 1/frontend/src/pages/student/StudentDashboard.jsx', 'w') as f:
    f.write(content)

print("Update completed.")

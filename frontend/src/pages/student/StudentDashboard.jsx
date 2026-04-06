import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/common/DashboardLayout";
import Card from "../../components/common/Card";
import { useAuth } from "../../context/AuthContext";
import { getStudentProfile } from "../../services/profile";
import { getActivities, createActivity, updateActivity, deleteActivity } from "../../services/activity";
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from "../../services/achievement";
import { getDepartmentClassrooms, joinDepartment, requestJoinClass } from "../../services/classroom";
import ActivitiesTable from "../../components/teacher/ActivitiesTable";
import ActivityFormModal from "../../components/teacher/ActivityFormModal";
import AchievementsTable from "../../components/student/StudentAchievementsTable";
import AchievementFormModal from "../../components/student/StudentAchievementFormModal";

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { section } = useParams();
  const [profileData, setProfileData] = useState(null);

  const [activities, setActivities] = useState([]);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  const [achievements, setAchievements] = useState([]);
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);

  const [classrooms, setClassrooms] = useState([]);
  const [departmentCodeInput, setDepartmentCodeInput] = useState("");

  const isAchievements = section === "achievements";
  const isActivities = section === "activities";
  const isClassMenu = section === "class";

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
      fetchActivities();
      fetchAchievements();
    }
  }, [user?.id]);

  useEffect(() => {
    if (isClassMenu && profileData?.departmentId) {
      fetchClassrooms(profileData.departmentId);
    }
  }, [isClassMenu, profileData?.departmentId]);

  const fetchProfile = async () => {
    try {
      const response = await getStudentProfile(user.id);
      setProfileData(response.student);
    } catch (err) {
      console.error("Failed to load profile.", err);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.activities || []);
    } catch (err) {
      console.error("Failed to load activities.", err);
    }
  };

  const fetchAchievements = async () => {
    try {
      const response = await getAchievements();
      setAchievements(response.achievements || []);
    } catch (err) {
      console.error("Failed to load achievements.", err);
    }
  };

  const fetchClassrooms = async (deptId) => {
    try {
      const resp = await getDepartmentClassrooms(deptId);
      setClassrooms(resp.classrooms || []);
    } catch(err) {
      console.error("Failed to load classrooms.", err);
    }
  };

  const handleJoinDepartment = async (e) => {
    e.preventDefault();
    try {
      await joinDepartment({ studentId: user.id, departmentCode: departmentCodeInput });
      alert("Joined department successfully!");
      fetchProfile();
    } catch(err) {
      alert(err.response?.data?.message || "Failed to join department.");
    }
  };

  const handleJoinClass = async (classId) => {
    try {
      await requestJoinClass({ studentId: user.id, classId });
      alert("Request sent successfully!");
      fetchClassrooms(profileData.departmentId);
    } catch(err) {
      alert(err.response?.data?.message || "Failed to send request.");
    }
  };

  const handleCreateActivity = async (payload) => {
    try {
      if (editingActivity) {
        await updateActivity(editingActivity._id, payload);
      } else {
        await createActivity({
          ...payload,
          createdBy: user?.id || user?.username || user?.email,
        });
      }
      setEditingActivity(null);
      await fetchActivities();
    } catch (err) {
      console.error("Failed to save activity.", err);
    }
  };

  const handleDeleteActivity = async (activity) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        await deleteActivity(activity._id);
        await fetchActivities();
      } catch (err) {
        console.error("Failed to delete activity.", err);
      }
    }
  };

  const handleCreateAchievement = async (payload) => {
    try {
      if (editingAchievement) {
        await updateAchievement(editingAchievement._id, payload);
      } else {
        await createAchievement({
          ...payload,
          createdBy: user?.id || user?.username || user?.email,
          achievedByType: "Student",
          achievedBy: user?.id,
          achievedByName: profileData?.firstName ? `${profileData.firstName} ${profileData.lastName || ''}`.trim() : user?.name || user?.username || "Student",
          departmentId: profileData?.departmentId || null,
          departmentName: profileData?.departmentName || null,
          departmentCode: profileData?.departmentCode || null,
        });
      }
      setEditingAchievement(null);
      await fetchAchievements();
    } catch (err) {
      console.error("Failed to save achievement.", err);
    }
  };

  const handleDeleteAchievement = async (achievement) => {
    if (window.confirm("Are you sure you want to delete this achievement?")) {
      try {
        await deleteAchievement(achievement._id);
        await fetchAchievements();
      } catch (err) {
        console.error("Failed to delete achievement.", err);
      }
    }
  };

  const openActivityEditModal = (activity) => {
    setEditingActivity(activity);
    setIsActivityModalOpen(true);
  };

  const openAchievementEditModal = (achievement) => {
    setEditingAchievement(achievement);
    setIsAchievementModalOpen(true);
  };

  const myActivities = useMemo(() => {
    if (!user?.id) return activities;
    return activities.filter(a => a.createdBy === user?.id || a.createdBy?._id === user?.id);
  }, [activities, user]);

  const myAchievements = useMemo(() => {
    if (!user?.id) return achievements;
    return achievements.filter(a => a.createdBy === user?.id || a.createdBy?._id === user?.id || a.achievedBy === user?.id || a.achievedBy?._id === user?.id);
  }, [achievements, user]);

  const classNameStr = profileData?.className || "Not Assigned";
  const prnNumberStr = profileData?.prnNumber || "N/A";

  const stats = [
    { title: "Class Name", value: classNameStr, helper: `View your class` },
    { title: "PRN Number", value: prnNumberStr, helper: "Your university roll number" },
    { title: "Semester", value: profileData?.semester || "N/A", helper: "Current academic semester" },
    { title: "Achievements", value: myAchievements.length, helper: "Your tracked achievements", onClick: () => navigate("/student/achievements"), className: "cursor-pointer hover:shadow-lg hover:border-purple-300 transition-all" }
  ];

  return (
    <DashboardLayout
      role="student"
      title={isAchievements ? "My Achievements" : isClassMenu ? "My Class" : "Student Dashboard"}
      subtitle={isAchievements ? "Add, modify or delete your achievements." : isClassMenu ? "Manage your class." : "Track your academic details."}
      actions={isAchievements ? (
        <button
          className=" text-xs sm:text-sm px-3 sm:px-4 py-2 bg-white  text-black"
          onClick={() => { setEditingAchievement(null); setIsAchievementModalOpen(true) }}
        >
          Add Achievement
        </button>
      ) : isActivities ? (
        <button
          className="bg-white text-xs sm:text-sm px-3 sm:px-4 py-2 text-black"
          onClick={() => { setEditingActivity(null); setIsActivityModalOpen(true) }}
        >
          Add Activity
        </button>
      ) : null}
      onLogout={() => {
        logout();
        navigate("/login");
      }}
    >
      <ActivityFormModal 
        isOpen={isActivityModalOpen} 
        onClose={() => setIsActivityModalOpen(false)} 
        onSubmit={handleCreateActivity}
        initialData={editingActivity}
      />
      <AchievementFormModal 
        isOpen={isAchievementModalOpen} 
        onClose={() => setIsAchievementModalOpen(false)} 
        onSubmit={handleCreateAchievement}
        initialData={editingAchievement}
      />

      {isClassMenu && (
        <div className="space-y-6">
          {!profileData?.departmentId ? (
            <div className="card p-8 bg-indigo-50 border-indigo-200">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Join a Department</h3>
              <p className="text-sm text-slate-600 mb-4">You have not joined any department yet. Enter the code provided by your department to join.</p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md" onSubmit={handleJoinDepartment}>
                <input required className="input flex-1" placeholder="Department Code" value={departmentCodeInput} onChange={e => setDepartmentCodeInput(e.target.value)} />
                <button type="submit" className="btn-primary whitespace-nowrap">Join Department</button>
              </form>
            </div>
          ) : (
            <div>
              <div className="card p-6 mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 border text-slate-900">
                 <h3 className="font-bold text-lg text-emerald-900 mb-1">Department: {profileData.departmentName} ({profileData.departmentCode})</h3>
                 <p className="text-sm text-emerald-700 font-medium">{profileData.collegeName}</p>
                 {profileData.className && (
                   <div className="mt-4 p-4 bg-white/80 rounded-lg border border-emerald-100 shadow-sm">
                     <h4 className="font-semibold text-slate-500 text-xs tracking-wider uppercase">Enrolled Class</h4>
                     <p className="text-indigo-700 font-bold text-xl mt-1">{profileData.className}</p>
                   </div>
                 )}
              </div>
              
              {!profileData.className && (
                <>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 px-1">Available Classes to Join</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {classrooms.map(cls => {
                      const isPending = cls.pendingStudents.some(id => id.toString() === user.id || id === user.id || id._id === user.id);
                      return (
                        <Card 
                          key={cls._id} 
                          title={cls.name} 
                          value={isPending ? "Pending Approval" : "Request to Join"} 
                          helper={`Teacher: ${cls.classTeacherId?.firstName || 'Unknown'}`} 
                          onClick={() => !isPending && handleJoinClass(cls._id)} 
                          className={isPending ? "bg-orange-50/50 border-orange-200 cursor-not-allowed opacity-90" : "cursor-pointer hover:border-indigo-500 shadow-sm"} 
                        />
                      );
                    })}
                    {classrooms.length === 0 && <p className="text-slate-500 italic p-4">No classes found in this department.</p>}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {!isAchievements && !isActivities && !isClassMenu && (
        <>
          <div className="mb-6 rounded-2xl bg-indigo-50 p-6 border border-indigo-500">
            <h2 className="text-lg font-semibold text-slate-900">
              Welcome back, {profileData?.firstName || user?.name || "Student"}!
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Here you will find your class information and academic updates.
            </p>
          </div>

          {!profileData?.departmentId && (
            <div className="mb-6 rounded-2xl bg-orange-50 border border-orange-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
               <div>
                  <h3 className="text-lg font-bold text-orange-900">Action Required</h3>
                  <p className="text-sm text-orange-800 mt-1">You must join your appropriate department to be able to join an academic classroom.</p>
               </div>
               <button 
                  className="btn-primary whitespace-nowrap bg-orange-600 hover:bg-orange-700 shadow-sm"
                  onClick={() => navigate("/student/class")}
               >
                 Join Department Now
               </button>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <Card key={stat.title} title={stat.title} value={stat.value} helper={stat.helper} onClick={stat.onClick} className={stat.className} />
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">My Activities</h3>
            <ActivitiesTable activities={myActivities} onEdit={openActivityEditModal} onDelete={handleDeleteActivity} />
          </div>
        </>
      )}

      {isAchievements && (
        <AchievementsTable achievements={myAchievements} onEdit={openAchievementEditModal} onDelete={handleDeleteAchievement} />
      )}
      
      {isActivities && (
        <ActivitiesTable activities={myActivities} onEdit={openActivityEditModal} onDelete={handleDeleteActivity} />
      )}
    </DashboardLayout>
  );
}

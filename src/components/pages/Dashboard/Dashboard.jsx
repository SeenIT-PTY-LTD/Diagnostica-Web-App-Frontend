import { lazy, Suspense } from "react";

// Lazy load the RecentPatients component
const RecentPatients = lazy(() => import("./RecentPatients"));

function Dashboard() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <RecentPatients title="Recent Patients" />
    </Suspense>
  );
}

export default Dashboard;

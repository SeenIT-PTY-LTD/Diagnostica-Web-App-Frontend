import React, { Suspense } from 'react';
const PatientInfo = React.lazy(() => import('./PatientInfo'));
const PersonalInfo = React.lazy(() => import('./PersonalInfo'));

const PatientDetails = () => {
  return (
    <div className="flex gap-8">
      <Suspense fallback={<div>Loading patient information...</div>}>
        <PatientInfo />
      </Suspense>

      <Suspense fallback={<div>Loading personal information...</div>}>
        <PersonalInfo />
      </Suspense>
    </div>
  );
};

export default PatientDetails;

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Studentlistinsert = ({ formattedScholarshipIDs, studentid, filterscholarship, updateTownId }: any) => {
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

    const handleCheckboxChange = (studentId: number) => {
        setSelectedStudents((prev) => {
            const updatedSelected = prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId];

            return updatedSelected;
        });
    }

    useEffect(() => {
        if (selectedStudents.length > 0) {
            handleSubmit(selectedStudents);
        }
    }, [selectedStudents]);

    const handleSubmit = async (updatedSelected: number[]) => {
        // Check if the student is already selected to skip scholarship validation
        const isStudentAlreadySelected = updatedSelected.some(id => formattedScholarshipIDs.includes(id));

        if (!filterscholarship && !isStudentAlreadySelected) {
            toast.error("Please select a scholarship first.");
            return;
        }

        const dobs = new Date();
            
        const bodyData = {
            student_id: "",
            serial_number: '',
            full_name: '',
            gr_no: '',
            uid: "",
            school_id: "",
            current_std: "",
            mother_name: "",
            date_of_birth: dobs,
            gender: "",
            cast: "",
            aadhaar: "",
            contact_no: "",
            address: "",
            sickle_cell: "",
            sickle_report: "",
            student_scholarship_id: updatedSelected,
            scholarship_name: filterscholarship,
        };

        try {
            const method = updateTownId ? "PUT" : "POST";
            const url = `/api/scholarshipstudent/insert`;

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData),
            });

            if (response.ok) {
                const message = updateTownId ? "updated" : "added";
                toast.success(`Student ${message} successfully!`);

                const updatedStudent = await response.json();
                // Handle the updated student data as necessary
                // ...
                
                // setShowModel(false);
            } else {
                const error = await response.json();
                toast.error(`Failed to save student: ${error.message}`);
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        } finally {
            // setIsLoading(false);
        }
    };

    return (
        <div>
            <input
                type="checkbox"
                value={studentid}
                onChange={() => handleCheckboxChange(studentid)}
                checked={formattedScholarshipIDs.includes(studentid) || selectedStudents.includes(studentid)}
                disabled={formattedScholarshipIDs.includes(studentid) || selectedStudents.includes(studentid)}
            />
        </div>
    );
}

export default Studentlistinsert;

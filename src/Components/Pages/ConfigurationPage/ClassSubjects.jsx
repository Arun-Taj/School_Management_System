import React from 'react';
import { FaEdit } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const ClassSubjects = ({ classes }) => {
    const navigate = useNavigate();

    const editClick = () => {
        navigate('/config/assignSubject/edit');
    };

    return (
        <div className="py-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-center text-xl font-bold mb-4">Classes With Subjects</h2>
            <div className="h-96 overflow-y-auto">
                {classes.map((classItem, index) => (
                    <div
                        key={index}
                        className={`w-full ${index % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"}`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1 flex flex-col justify-center items-center">
                                <h3 className="text-lg font-bold pt-3">{classItem.className}</h3>
                                <div className="w-1/4 h-0.5 bg-black mt-2"></div>
                            </div>
                            <button className="flex justify-end pr-2" onClick={editClick}>
                                <FaEdit />
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {classItem.subjects.map((subject, subIndex) => (
                                <div key={subIndex} className="p-2 rounded-lg text-center">
                                    <p className="font-semibold">{subject.subject}</p>
                                    <p className="text-sm">{subject.teacher}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassSubjects;

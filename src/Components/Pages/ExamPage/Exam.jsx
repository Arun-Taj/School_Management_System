import React from 'react'
import Dashboard from '../../DashBoard/DashBoard'

const Exam = () => {
  return (
   <>
    <Dashboard/>
    <div className="bg-[#E3D6FF] p-2">
                        {classItem.subjects.map((subject, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between mt-2 px-4"
                          >
                            <span>{subject}</span>
                            <div className="flex gap-2">
                              <input
                                type="number"
                                min="0"
                                placeholder="Total Marks"
                                
                                //  onChange={(e) =>
                                //    handleMarksChange(
                                //      classItem.className,
                                //      subject,
                                //      e.target.value
                                //    )
                                //  }
                                //  value={
                                //    selectedClasses[classItem.className][
                                //      subject
                                //    ] || ""
                                //  }
                                className="bg-white border border-gray-300 px-2 rounded-full w-28"
                              />
                              <button>
                                <RiDeleteBin6Line />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
   </>
  )
}

export default Exam
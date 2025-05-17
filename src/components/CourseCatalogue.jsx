import  { useState, useEffect } from "react";

const CourseCatalogue = ({ addToCart, courses }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [instructorFilter, setInstructorFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const coursesPerPage = 3;


  const instructors = ["all", ...new Set(courses.map(course => course.instructor))];


  const filteredCourses = courses.filter((course) => {

    const matchesSearch = searchTerm === "" || course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.description.toLowerCase().includes(searchTerm.toLowerCase());
    

    const matchesInstructor = instructorFilter === "all" || course.instructor === instructorFilter;

    const matchesPriceRange = course.price >= priceRange[0] && course.price <= priceRange[1];
    
    return matchesSearch && matchesInstructor && matchesPriceRange;
  });
// algo for pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
// ---------------------------------------

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, instructorFilter, priceRange]);

  const minPrice = Math.min(...courses.map(course => course.price));
  const maxPrice = Math.max(...courses.map(course => course.price));

  return (
    <div className="w-full text-white mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Course Catalogue</h2>
      

      <div className="grid grid-cols-3 gap-12 pb-3">

        <div className="relative">
          <input
            type="text"
            placeholder="Search by title or keyword"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        

        <div>
          <select
            className="w-full px-4 py-2 rounded-lg bg-gray-700 "
            value={instructorFilter}
            onChange={(e) => setInstructorFilter(e.target.value)}
          >
            {instructors.map((instructor) => (
              <option key={instructor} value={instructor} className=" hover:bg-blue-400">
                {instructor === "all" ? "All Instructors" : instructor}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className=" text-sm font-medium mb-1">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              className="w-full "
            />
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full "
            />
          </div>
        </div>
      </div>


      {currentCourses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6">
            {currentCourses.map((course) => (
              <div 
                key={course.id} 
                className="border border-gray-600 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={course.image || "https://via.placeholder.com/300x200"}
                      alt={course.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4 md:w-2/3">
                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                    <p className="text-gray-300 mb-3">{course.description}</p>
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <span className="text-blue-300">
                        Instructor: {course.instructor}
                      </span>
                      <span className="font-bold text-lg">${course.price}</span>
                    </div>
                    <button
                      className="w-full md:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 font-medium rounded-lg transition-colors"
                      onClick={() => addToCart(course)}
                    >
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
                >
                  &lt;
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-600' : 'bg-gray-700'}`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
                >
                  &gt;
                </button>
              </nav>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p>No courses found matching your criteria.</p>
          <button 
            className="mt-4 px-4 py-2 text-blue-400 hover:text-blue-300"
            onClick={() => {
              setSearchTerm("");
              setInstructorFilter("all");
              setPriceRange([minPrice, maxPrice]);
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCatalogue;
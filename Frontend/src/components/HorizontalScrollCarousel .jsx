import React from "react";

const TeamSection = () => {
  return (
    <div className="bg-gray-300 py-16 px-6 md:px-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Meet Our Team
      </h2>

      <div
        className="flex overflow-x-auto gap-8 pb-6 scroll-smooth"
        style={{
          scrollbarWidth: "none",          // Firefox
          msOverflowStyle: "none",         // IE/Edge
        }}
        onWheel={(e) => {
          e.currentTarget.scrollLeft += e.deltaY; // smooth horizontal scroll on mouse wheel
        }}
      >
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="min-w-[320px] max-w-[320px] flex-shrink-0 bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <img
              src={member.url}
              alt={member.title}
              className="w-full h-[320px] object-cover"
            />
            <div className="p-5 text-center">
              <h3 className="text-2xl font-semibold text-gray-800">{member.title}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const teamMembers = [
  {
    id: 1,
    url: "https://media.licdn.com/dms/image/v2/D4D03AQGvudvHm_EMDQ/profile-displayphoto-shrink_400_400/B4DZYK3WC.G4Ak-/0/1743939003516?e=1750291200&v=beta&t=CQDy3_cC775ngcxfsrIDpmZgdN5ADlDY3XRsp9dURXU",
    title: "John Doe",
    role: "Frontend Developer",
  },
  {
    id: 2,
    url: "https://media.licdn.com/dms/image/v2/D4D03AQGvudvHm_EMDQ/profile-displayphoto-shrink_400_400/B4DZYK3WC.G4Ak-/0/1743939003516?e=1750291200&v=beta&t=CQDy3_cC775ngcxfsrIDpmZgdN5ADlDY3XRsp9dURXU",
    title: "Jane Smith",
    role: "UI/UX Designer",
  },
  {
    id: 3,
    url: "https://media.licdn.com/dms/image/D4D03AQGvudvHm_EMDQ/profile-displayphoto-shrink_400_400/0/1743939003516",
    title: "Robert Wilson",
    role: "Backend Developer",
  },
  {
    id: 4,
    url: "https://media.licdn.com/dms/image/D4D03AQGvudvHm_EMDQ/profile-displayphoto-shrink_400_400/0/1743939003516",
    title: "Emily Davis",
    role: "Product Manager",
  },
  {
    id: 5,
    url: "https://media.licdn.com/dms/image/D4D03AQGvudvHm_EMDQ/profile-displayphoto-shrink_400_400/0/1743939003516",
    title: "Alex Johnson",
    role: "Cloud Architect",
  },
];

export default TeamSection;

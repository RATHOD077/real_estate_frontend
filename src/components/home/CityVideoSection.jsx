export default function CityVideoSection() {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <img 
        src="/city-skyline.jpg" 
        alt="City View" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/80" />

      <div className="relative z-10 text-center text-white px-6">
        <div 
          onClick={() => window.open('https://youtube.com/your-project-video', '_blank')}
          className="w-24 h-24 mx-auto rounded-full border-4 border-white flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
        >
          <div className="w-0 h-0 border-t-[18px] border-t-transparent border-l-[30px] border-l-white border-b-[18px] border-b-transparent ml-2" />
        </div>
        <p className="mt-6 text-xl font-medium">Experience the City from Your Balcony</p>
      </div>
    </section>
  );
}
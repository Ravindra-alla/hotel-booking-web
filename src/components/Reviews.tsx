import { Star } from "lucide-react";
import reviewer1 from "@/assets/reviewer1.jpg";
import reviewer2 from "@/assets/reviewer2.jpg";
import reviewer3 from "@/assets/reviewer3.jpg";
import reviewer4 from "@/assets/reviewer4.jpg";
import reviewer5 from "@/assets/reviewer5.jpg";
import reviewer6 from "@/assets/reviewer6.jpg";

const reviews = [
  { name: "Priya Sharma", location: "Traveler", rating: 5, text: "The tour was absolutely magical! Every visit felt like stepping back in time. Truly a royal experience.", photo: reviewer1 },
  { name: "Rahul Verma", location: "Explorer", rating: 5, text: "The coastal cruise was the highlight of our honeymoon. The stay was world-class and unforgettable.", photo: reviewer2 },
  { name: "Ananya Desai", location: "Traveler", rating: 5, text: "The nature trail was perfectly curated. Hidden spots, delicious food, and the sunset cruise was breathtaking!", photo: reviewer3 },
  { name: "Suresh Iyer", location: "Adventurer", rating: 4, text: "The mountain trek was challenging but incredibly rewarding. The beauty left us speechless. Highly recommended!", photo: reviewer4 },
  { name: "Vikram Patel", location: "Explorer", rating: 5, text: "The expedition was a dream come true! The scenery is unreal. Best adventure of my life.", photo: reviewer5 },
  { name: "Meera Nair", location: "Traveler", rating: 5, text: "The spiritual energy is indescribable. The evening experience gave me goosebumps. Truly transformative.", photo: reviewer6 },
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <div className="w-80 shrink-0 bg-card rounded-2xl p-6 shadow-md border border-border mx-3">
    <div className="flex items-center gap-3 mb-4">
      <img src={review.photo} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
      <div>
        <p className="font-semibold text-card-foreground text-sm font-body">{review.name}</p>
        <p className="text-muted-foreground text-xs">{review.location}</p>
      </div>
    </div>
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < review.rating ? "text-primary fill-primary" : "text-muted"} />
      ))}
    </div>
    <p className="text-muted-foreground text-sm leading-relaxed font-body italic">"{review.text}"</p>
  </div>
);

const Reviews = () => {
  const doubled = [...reviews, ...reviews];

  return (
    <section className="section-padding bg-background overflow-hidden" id="reviews">
      <div className="text-center mb-14 reveal">
        <p className="text-primary font-semibold font-body tracking-widest uppercase text-sm mb-3">Testimonials</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Guest Experiences</h2>
      </div>
      <div className="flex review-scroll w-max animate-scroll">
        {doubled.map((r, i) => (<ReviewCard key={`${r.name}-${i}`} review={r} />))}
      </div>
    </section>
  );
};

export default Reviews;

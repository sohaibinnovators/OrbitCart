import { Hero } from "@/src/components/home/Hero";
import { CategorySection } from "@/src/components/home/CategorySection";
import { FeaturedProducts } from "@/src/components/home/FeaturedProducts";
import { TrendingProducts } from "@/src/components/home/TrendingProducts";
import { BrandBenefits } from "@/src/components/home/BrandBenefits";
import { EditorialSection } from "@/src/components/home/EditorialSection";
import { BestSellers } from "@/src/components/home/BestSellers";
import { NewsletterSection } from "@/src/components/home/NewsletterSection";
import { FaqPreview } from "@/src/components/home/FaqPreview";
import { FinalCta } from "@/src/components/home/FinalCta";
import { PromotionalBanner } from "@/src/components/ui/PromotionalBanner";
import { Container } from "@/src/components/ui/Container";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <Container className="pb-20">
        <PromotionalBanner
          eyebrow="Campaign"
          title="A Little Upgrade Goes a Long Way."
          text="Discover products designed to bring more style, comfort, and convenience to your everyday routine."
          href="/shop?sale=1"
          label="Explore the Collection"
          image="/images/banners/promo.jpg"
          alt="Hands placing a portable speaker beside linen and sunglasses"
        />
      </Container>
      <TrendingProducts />
      <BrandBenefits />
      <EditorialSection />
      <BestSellers />
      <NewsletterSection />
      <FaqPreview />
      <FinalCta />
    </>
  );
}

import UploadImage from "@/components/shared/detector/uploadImage";
import ImageComparisonCarousel from "@/components/shared/detector/ImageComparisonCarousel";
import FAQSection from "@/components/shared/detector/FAQSection";

const DetectorPage = () => {
  return (
    <div>
      <UploadImage />
      <ImageComparisonCarousel />
      <FAQSection />
    </div>
  );
};

export default DetectorPage;

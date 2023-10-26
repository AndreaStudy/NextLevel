import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
  StyledOnboarding,
  StyledOnboardingButtonContainer,
  StyledOnboardingCaption,
  StyledOnboardingCarousel,
  StyledOnboardingGoogleButton,
  StyledOnboardingImage,
  StyledOnboardingNextButton,
  StyledOnboardingPageIndicator,
  StyledOnboardingSkipButton,
} from "./Onboarding.styled";

import { useState } from "react";

function Onboarding() {
  const [imageList, setImageList] = useState([
    { src: "/bottomNav/contentsbutton.png", caption: "1번" },
    { src: "/bottomNav/learnbutton.png", caption: "2번" },
    { src: "/bottomNav/mypagebutton.png", caption: "3번" },
    { src: "/bottomNav/rankingbutton.png", caption: "4번" },
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = imageList.length;

  const handlePrevClick = () => {
    setCurrentImageIndex(totalImages - 1);
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handleCarouselChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <StyledOnboarding>
      <StyledOnboardingCarousel
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        emulateTouch
        swipeable
        onChange={handleCarouselChange}
        selectedItem={currentImageIndex}
        renderIndicator={() => {}}
      >
        {imageList.map((image, index) => (
          <div key={index}>
            <StyledOnboardingImage src={image.src} alt={image.caption} />
          </div>
        ))}
      </StyledOnboardingCarousel>
      {imageList.map((image, index) => (
        <StyledOnboardingCaption
          isActive={currentImageIndex === index ? true : false}
        >
          {image.caption}
        </StyledOnboardingCaption>
      ))}

      <StyledOnboardingPageIndicator
        total={totalImages}
        current={currentImageIndex}
      />
      <StyledOnboardingButtonContainer>
        {currentImageIndex === totalImages - 1 ? (
          <a href={import.meta.env.VITE_KAKAO_LOGIN_URL}>
            <StyledOnboardingGoogleButton>
              <img src="" alt="google login" />
            </StyledOnboardingGoogleButton>
          </a>
        ) : (
          <StyledOnboardingButtonContainer>
            <StyledOnboardingSkipButton onClick={handlePrevClick}>
              건너뛰기
            </StyledOnboardingSkipButton>

            <StyledOnboardingNextButton onClick={handleNextClick}>
              다음
            </StyledOnboardingNextButton>
          </StyledOnboardingButtonContainer>
        )}
      </StyledOnboardingButtonContainer>
    </StyledOnboarding>
  );
}

export default Onboarding;

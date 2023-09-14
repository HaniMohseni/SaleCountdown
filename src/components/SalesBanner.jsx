import React, { useState, useEffect } from "react";

function SalesBanner() {
  const [saleEndsIn, setSaleEndsIn] = useState(calculateSaleEndsIn());
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const secondsRemaining = calculateSaleEndsIn();
      if (secondsRemaining <= 0) {
        clearInterval(countdownInterval);
        setShowBanner(false);
      } else {
        setSaleEndsIn(secondsRemaining);
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  function calculateSaleEndsIn() {
    const saleEndDate = new Date();
    saleEndDate.setDate(saleEndDate.getDate() + 5); // Sale lasts for 5 days
    saleEndDate.setHours(23, 59, 59, 999); // Set the time to the end of the last day

    const currentTime = new Date();
    const timeDiff = saleEndDate - currentTime;
    return Math.max(Math.floor(timeDiff / 1000), 0); // Ensure non-negative value
  }

  if (!showBanner) {
    return null; // Hide the banner when the countdown ends
  }

  return (
    <div className="bg-black text-white text-center py-2">
      <p className="text-lg font-bold">
        Blow out sale! Buy one get one 50% off!
      </p>
      <p className="text-sm">
        Sale Ends In{" "}
        <span className="font-normal">{formatTime(saleEndsIn)}</span>
      </p>
    </div>
  );
}

function formatTime(seconds) {
  const days = Math.floor(seconds / 86400);
  seconds %= 86400;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  return (
    <span>
      <span className="font-bold">{days}</span> Days{" "}
      <span className="font-bold">{hours}</span> Hours{" "}
      <span className="font-bold">{minutes}</span> Minutes{" "}
      <span className="font-bold">{seconds}</span> Seconds
    </span>
  );
}

export default SalesBanner;

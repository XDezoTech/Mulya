// src/components/SellItem.jsx
import { useState } from 'react';
import Header from '../ui/Header';
import ItemInformation from '../features/sellItem/ItemInformation';
import Price from '../features/sellItem/Price';
import Time from '../features/sellItem/Time';
import Photos from '../features/sellItem/Photos';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateAuction } from '../features/sellItem/useCreateAuction';
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SellItem() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState('slide-in-right');
  const [realFiles, setRealFiles] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    item_title,
    item_description,
    category,
    starting_price,
    reserve_price,
    buy_now_price,
    bid_increment_limit,
    start_time,
    end_time,
    photos,
  } = useSelector((state) => state.sellItem);
  const { createAuction, isCreating } = useCreateAuction();

  const handleNext = () => {
    setDirection('slide-in-right'); // new card enters from the right
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setDirection('slide-in-left'); // new card enters from the left
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !item_title ||
      !item_description ||
      !category ||
      !starting_price ||
      !reserve_price ||
      !buy_now_price ||
      !bid_increment_limit ||
      !start_time ||
      !end_time
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }
    createAuction(
      {
        item_title,
        item_description,
        category,
        starting_price,
        reserve_price,
        buy_now_price,
        bid_increment_limit,
        start_time,
        end_time,
        photos: realFiles,
      },
      {
        onSuccess: () => {
          toast.success('Auction created successfully!');
          navigate('/');
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to create auction.');
        },
      },
    );
  };

  return (
    <>
      {/* <Header />e */}

      {/* 
        key={step} forces React to unmount/mount this container on step change,
        and className={direction} picks the correct slide animation.
      */}
      <div
        key={step}
        className={` ${direction} mx-auto mt-8 max-w-4xl rounded-lg bg-gradient-to-r from-white to-gray-100 p-8 shadow-xl`}
      >
        <ul className="steps steps-vertical lg:steps-horizontal mb-8 w-full">
          <li className={`step ${step >= 0 ? 'step-primary' : ''}`}>
            Item Information
          </li>
          <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>Price</li>
          <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>Time</li>
          <li className={`step ${step === 3 ? 'step-primary' : ''}`}>
            Upload Photos
          </li>
        </ul>

        <form className="space-y-6">
          {step === 0 && <ItemInformation />}
          {step === 1 && <Price />}
          {step === 2 && <Time />}
          {step === 3 && <Photos setRealFiles={setRealFiles} />}

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="btn btn-outline btn-lg"
              disabled={step === 0}
            >
              Back
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary btn-lg"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-success btn-lg"
                onClick={handleSubmit}
                disabled={isCreating}
              >
                {isCreating ? 'Submitting…' : 'Submit'}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

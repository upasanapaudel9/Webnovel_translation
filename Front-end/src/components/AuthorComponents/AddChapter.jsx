import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { authorAddChapterAPI, paymentEligibleCheckAPI } from '../../APIs/userAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { authorNovelDetails, signup } from '../../util/constants';

export default function AuthorCreate() {

    const navigate = useNavigate();
    const location = useLocation();

    const [NovelId, setNovelId] = useState('');
    const [title, setTitle] = useState('');

    const [originalContent, setOriginalContent] = useState('');
    const [translatedContent, setTranslatedContent] = useState('');

    const [paymentSystem, setPaymentSystem] = useState(false);
    const [gcoin, setGcoin] = useState(0);

    const [isSchedule, setIsSchedule] = useState(false);
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user-login'));

        if (!user?.isAuthor) {
            navigate(signup);
        } else {
            const queryParams = new URLSearchParams(location.search);
            const NovelIdQuery = queryParams.get('NovelId');

            if (!NovelIdQuery) {
                navigate(-1);
            } else {
                setNovelId(NovelIdQuery);
            }
        }
    }, [location, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!translatedContent || translatedContent.length < 10 || !title) {
                toast.error('Please complete the title and translated content (min 10 chars)');
                return;
            }

            if (isSchedule && (!scheduleTime || !scheduleDate)) {
                toast.error('Complete the schedule!');
                return;
            }

            if (isSchedule) {
                const currentDate = new Date();
                const selectedDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
                if (selectedDateTime < currentDate) {
                    toast.error('Scheduled time must be in the future!');
                    return;
                }
            }

            const queryParams = new URLSearchParams(location.search);
            const chapterNumber = queryParams.get('number');

            const body = JSON.stringify({
                NovelId,
                title,
                content: translatedContent,       
                originalContent,                  
                translatedContent,                
                chapterNumber,
                gcoin,
                scheduleDate,
                scheduleTime
            });

            const response = await authorAddChapterAPI(body);

            if (response.data.status) {
                toast.success(response.data.message);
                navigate(`${authorNovelDetails}?NovelId=${NovelId}`, { replace: true });
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    const checkPayment = async () => {
        try {
            const body = JSON.stringify({ NovelId });
            const response = await paymentEligibleCheckAPI(body);

            if (response.data.status) {
                toast.success("Eligible for payment");
                setPaymentSystem(true);
            } else {
                toast.error("Not enough view count");
            }
        } catch (error) {
            console.error('Payment check error:', error);
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    const handleSetSchedule = () => {
        setIsSchedule(prev => !prev);
        if (isSchedule) {
            setScheduleDate('');
            setScheduleTime('');
        }
    };

    return (
        <div className='m-2 md:m-2 bg-gray-600 p-9 hover:shadow-2xl'>
            <p className='poppins text-center text-gray-100 text-3xl mt-4 mb-1'>
                Add Chapter <i className="fa-solid fa-book-open ml-2"></i>
            </p>
            <small className='poppins2 text-center text-gray-400 block'>
                Add the chapter for your novel, let's go...
            </small>

            <form className="bg-gray-600" onSubmit={handleSubmit}>
                {/* Chapter Title */}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                        Chapter Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Title for the chapter"
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* Content Panels */}
                <div className="flex gap-6">
                    {/* Original Content (Read-only) */}
                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                            Original Content (Foreign Language)
                        </label>
                        <textarea
                            value={originalContent}
                            onChange={e => setOriginalContent(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white h-56 novelFont resize-y"
                            placeholder="Paste Original Novel Content Here"
                            required
                        />
                    </div>

                    {/* Translated Content */}
                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                            Translated Content (English)
                        </label>
                        <textarea
                            value={translatedContent}
                            onChange={e => setTranslatedContent(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white h-56 novelFont resize-y"
                            placeholder="Write English Translation Content Here"
                            required
                        />
                    </div>
                </div>

                {/* Payment System */}
                {!paymentSystem ? (
                    <p className="text-white hover:bg-gray-700 mt-14 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center cursor-pointer" onClick={checkPayment}>
                        Add Payment System
                    </p>
                ) : (
                    <div className='flex gap-2 text-white font-mono text-center pt-5'>
                        {[0, 2, 5, 10, 15].map(val => (
                            <p key={val}
                                className={`p-3 rounded-2xl grow hover:scale-105 shadow-md hover:shadow-2xl cursor-pointer 
                                ${val === 0 ? 'bg-gray-500 hover:bg-gray-800' : 'bg-blue-600 hover:bg-blue-700'}`}
                                onClick={() => setGcoin(val)}>
                                {val === 0 ? 'none' : `${val}rs`}
                            </p>
                        ))}
                    </div>
                )}

                {gcoin > 0 && (
                    <p className='text-center mt-4 text-white poppins2'>
                        {`You selected ${gcoin}rs for this chapter`}
                    </p>
                )}

                {/* Submit & Schedule Buttons */}
                <div className='flex mt-10 gap-2'>
                    <button type="submit" className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 font-medium rounded-lg text-sm w-full text-center py-2.5">
                        Submit
                    </button>
                    <button type="button" className={`text-white ${!isSchedule ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 hover:bg-gray-500'} focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center`} onClick={handleSetSchedule}>
                        {isSchedule ? 'Remove' : 'Set'} Schedule
                    </button>
                </div>

                {/* Schedule Time Picker */}
                {isSchedule && (
                    <div className='space-x-2 mt-5 justify-center place-items-center text-center'>
                        <input
                            type="date"
                            className='p-3 w-52 rounded-lg bg-gray-500 text-white font-mono drop-shadow-md text-center text-lg hover:bg-gray-400'
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                            required
                        />
                        <input
                            type="time"
                            className='p-3 w-52 rounded-lg bg-gray-500 text-white font-mono drop-shadow-md text-center text-lg hover:bg-gray-400'
                            value={scheduleTime}
                            onChange={(e) => setScheduleTime(e.target.value)}
                            required
                        />
                    </div>
                )}

                {/* Cancel Button */}
                <button type="button" className="text-white bg-red-500 hover:bg-red-600 mt-5 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center" onClick={() => navigate(`${authorNovelDetails}?NovelId=${NovelId}`, { replace: true })}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

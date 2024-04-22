-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 08, 2024 at 12:36 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `patientdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_scores_tbl`
--

CREATE TABLE `activity_scores_tbl` (
  `date` varchar(50) NOT NULL,
  `pid` int(11) NOT NULL,
  `daily_score` int(11) NOT NULL,
  `question1` varchar(50) NOT NULL,
  `question2` varchar(50) NOT NULL,
  `question3` varchar(50) NOT NULL,
  `question4` varchar(50) NOT NULL,
  `question5` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_scores_tbl`
--

INSERT INTO `activity_scores_tbl` (`date`, `pid`, `daily_score`, `question1`, `question2`, `question3`, `question4`, `question5`) VALUES
('01/01/2024', 73, 4, 'done', 'done', 'done', 'done', ''),
('01/02/2024', 73, 1, 'done', '', '', '', ''),
('01/03/2024', 73, 2, 'done', 'done', '', '', ''),
('01/04/2024', 73, 3, 'done', 'done', 'done', '', ''),
('01/05/2024', 73, 3, 'done', 'done', 'done', '', ''),
('01/06/2024', 73, 2, 'done', 'done', '', '', ''),
('01/07/2024', 73, 1, 'done', '', '', '', ''),
('01/08/2024', 73, 5, 'done', 'done', 'done', 'done', 'done'),
('01/09/2024', 73, 3, 'done', 'done', 'done', '', ''),
('01/10/2024', 73, 5, 'done', 'done', 'done', 'done', 'done'),
('01/11/2024', 73, 3, 'done', 'done', 'done', '', ''),
('01/12/2024', 73, 4, 'done', 'done', 'done', 'done', ''),
('01/13/2024', 73, 2, 'done', 'done', '', '', ''),
('01/14/2024', 73, 2, 'done', 'done', '', '', ''),
('01/15/2024', 73, 5, 'done', 'done', 'done', 'done', 'done'),
('01/16/2024', 73, 2, 'done', 'done', '', '', ''),
('01/17/2024', 73, 5, 'done', 'done', 'done', 'done', 'done'),
('01/18/2024', 73, 4, 'done', 'done', 'done', 'done', ''),
('01/19/2024', 73, 4, 'done', 'done', 'done', 'done', ''),
('01/20/2024', 73, 3, 'done', 'done', 'done', '', ''),
('01/21/2024', 73, 2, 'done', 'done', '', '', ''),
('01/22/2024', 73, 3, 'done', 'done', 'done', '', ''),
('01/23/2024', 73, 4, 'done', 'done', 'done', 'done', ''),
('01/24/2024', 73, 4, 'done', 'done', 'done', 'done', ''),
('01/25/2024', 73, 5, 'done', 'done', 'done', 'done', 'done'),
('01/26/2024', 73, 1, 'done', '', '', '', ''),
('01/27/2024', 73, 4, 'done', 'done', '', 'done', 'done'),
('01/28/2024', 73, 3, 'done', 'done', 'done', '', ''),
('01/29/2024', 73, 2, 'done', 'done', '', '', ''),
('01/30/2024', 73, 3, 'done', 'done', 'done', '', ''),
('01/31/2024', 73, 3, 'done', 'done', '', '', 'done'),
('02/01/2024', 73, 5, 'done', 'done', 'done', 'done', 'done'),
('02/02/2024', 73, 1, 'done', '', '', '', ''),
('02/03/2024', 73, 1, 'done', 'done', 'done', 'done', ''),
('02/04/2024', 73, 4, 'done', '', 'done', 'done', 'done'),
('02/05/2024', 73, 3, 'done', 'done', 'done', '', ''),
('02/06/2024', 73, 2, 'done', 'done', '', '', ''),
('02/07/2024', 73, 3, 'done', '', 'done', '', 'done'),
('02/08/2024', 73, 2, 'done', 'done', '', '', ''),
('02/09/2024', 73, 3, 'done', '', '', 'done', 'done'),
('02/10/2024', 73, 1, 'done', '', '', '', ''),
('02/11/2024', 73, 4, 'done', 'done', 'done', 'done', ''),
('02/12/2024', 73, 1, 'done', '', '', '', ''),
('02/13/2024', 73, 3, 'done', 'done', '', '', 'done'),
('02/14/2024', 73, 4, 'done', 'done', 'done', 'done', ''),
('02/15/2024', 73, 5, 'done', 'done', 'done', 'done', 'done'),
('02/16/2024', 73, 5, 'done', 'done', 'done', 'done', 'done'),
('02/17/2024', 73, 3, 'done', 'done', 'done', '', ''),
('02/18/2024', 73, 2, 'done', 'done', 'done', 'done', 'done'),
('02/19/2024', 73, 3, 'done', 'done', 'done', '', ''),
('02/20/2024', 73, 2, 'done', 'done', '', '', ''),
('02/21/2024', 73, 3, 'done', 'done', 'done', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `annual_checkup_tbl`
--

CREATE TABLE `annual_checkup_tbl` (
  `id` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `date` varchar(50) NOT NULL,
  `emotionalMarks` int(11) NOT NULL,
  `interactionalMarks` int(11) NOT NULL,
  `physicalMarks` int(11) NOT NULL,
  `medicalMarks` int(11) NOT NULL,
  `outsideMarks` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `annual_checkup_tbl`
--

INSERT INTO `annual_checkup_tbl` (`id`, `pid`, `date`, `emotionalMarks`, `interactionalMarks`, `physicalMarks`, `medicalMarks`, `outsideMarks`) VALUES
(11, 91, '02/24/2024', 3, 1, 0, 1, 0),
(12, 91, '02/24/2024', 2, 0, 1, 0, 0),
(13, 91, '02/24/2024', 2, 0, 1, 0, 0),
(14, 91, '02/24/2024', 2, 0, 1, 0, 0),
(15, 91, '02/24/2024', 2, 0, 1, 0, 0),
(16, 91, '02/24/2024', 2, 0, 1, 0, 0),
(17, 91, '02/24/2024', 2, 0, 1, 0, 0),
(18, 91, '02/24/2024', 2, 0, 1, 0, 0),
(19, 91, '02/24/2024', 3, 0, 2, 0, 0),
(20, 91, '02/24/2024', 3, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `brainstorminfo_tbl`
--

CREATE TABLE `brainstorminfo_tbl` (
  `id` int(11) NOT NULL,
  `funct` varchar(255) NOT NULL,
  `steps` varchar(500) NOT NULL,
  `about` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brainstorminfo_tbl`
--

INSERT INTO `brainstorminfo_tbl` (`id`, `funct`, `steps`, `about`) VALUES
(1, 'Check mental state', 'Click \"check\" button in \"check your mental state\" banner.\r\nThen you will popup the chat window and then follow the instructions and provide your current feeling and symptoms to the AI.', 'Its very useful function that the user can check their mental state by their own.'),
(2, 'Annual checkup', 'Click the + icon on the annual checkup banner.\r\nThen you will popup the checkup window.\r\nWhen you hover each icon you will see a dropdown list and you can select symptoms that you have.', 'Brainstorm platform always take care about their patients. Throughout this annual checkup we can monitor patients well and guide them to better.'),
(3, 'Chat with your doctor', 'Click the chat button in the dashboard.\r\nThen you will see a window for chat with your doctor.', 'Throughout this function you can directly chat with your doctor and discuss your matters with your doctor.'),
(4, 'Next therapy', 'By clicking the bell icon easily you can add a notification and also you can customize in what time before do you need to notify that.\r\nBy clicking the calendar icon you can add this date and time to calendar as an event.\r\nBy clicking the settings icon you can popup the the settings window that you able to choose your free times and send them to your doctor.', 'Its very important set of functions that can allows users to do lot of things with next therapy date.'),
(5, 'Daily activities', 'By clicking the complete daily activities button you can see five activities that can optimize your mind.\r\nAfter completing the activities you can mark as done.', 'Its important to monitor the patients progress.'),
(6, 'Bargraph ', '', 'This bargraph shows monthly progress of the patient in last 6 months'),
(7, 'Add event', 'In dashboard calendar you can simply add an new event by clicking on the specific day on the calendar.\r\nIn event manager you can fill the related details of your event and click on the icon bellow which have calendar with + icon.', ''),
(8, 'Delete event', 'Select the event what you want to delete.\r\nThen click the icon bellow which have calendar and close.\r\n', ''),
(9, 'Search event', 'You can search event by date and title.\r\nEnter the date into date field that you want to search and click the search icon bellow.\r\nEnter the event title into title field and click the search icon bellow. ', ''),
(10, 'Update event', 'Change the information that you want to be changed in specific fields and click the button bellow which have calendar and tick icon.', ''),
(11, 'User details ', 'By clicking the profile icon in top right conner of the dashboard.\r\nThen you can see your account details.\r\nIf you want to change details click the the edit icon in each field and click the save changes button.', ''),
(12, 'Chat', 'Click the 3 bars in top left conner of the dashboard.\r\nChoose the \"Chat\" item from the list.', 'In this function you can chat with Brainstorm AI. it can analyze your feelings and symptoms and provide you some recommendations to feel better. Also the Brainstorm AI can guide you to search any function and any technical support.'),
(13, 'Test', 'Click the 3 bars in top left conner of the dashboard.\r\nChoose the \"Test\" item from the list.\r\nThen you can see several tests that follows global medical standards.\r\nSelect the test that you wish to go through and after answering all the questions you will see do you likely have that disorder or not.', 'that is very useful function to test that you have or haven\'t that disorder by yourself.'),
(14, 'Progress', 'Click the 3 bars in top left conner of the dashboard.\r\nChoose the \"Progress\" item from the list.\r\nThen you can see several progress charts like weekly progress, monthly progress etc.', 'It will provide an ability to get an idea about their own progress without asking the doctor. Its based on the daily activities that you have been completing daily.'),
(15, 'Report', 'Click the 3 bars in top left conner of the dashboard.\r\nChoose the \"Report\" item from the list.\r\nThen you can see report window and you can easily click on the \"generate report\" button and the your report will be generated within few seconds and you can download this report as PDF.\r\nIf you want further more detailed report you can add disorder description by turning on the toggle.\r\nIf you want to doctors approval then you should turn on the \"Request Doctor\'s approval\" toggle and it will automatic', 'You can make certified medical report by yourself.'),
(16, 'Treatment plan', 'At the beginning the doctor who you have chosen will inspect your information and confirm you as a patient.\r\nAfter that your doctor will conduct the therapy sessions in the way which suite for you.\r\n', 'In brainstorm simply you can start a treatment plan with your doctor. Your doctor will decide what type of plan do you need. According to your plan your doctor will schedule your upcoming therapy sessions. You can see your next therapy dates and all details in your dashboard. Also you can change the dates by requesting to your doctor. Have you any issue with that please put a direct message to your doctor.');

-- --------------------------------------------------------

--
-- Table structure for table `daily_activities_tbl`
--

CREATE TABLE `daily_activities_tbl` (
  `id` int(11) NOT NULL,
  `activity` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `daily_activities_tbl`
--

INSERT INTO `daily_activities_tbl` (`id`, `activity`) VALUES
(1, 'Exercise regularly.'),
(2, 'Go for a walk or hike.'),
(3, 'Try yoga or Pilates.'),
(4, 'Meditate for a few minutes.'),
(5, 'Practice deep breathing exercises.'),
(6, 'Keep a gratitude journal.'),
(7, 'Connect with a friend.'),
(8, 'Listen to soothing music.'),
(9, 'Learn a new recipe and cook a meal.'),
(10, 'Watch a funny movie or TV show.'),
(11, 'Spend time with a pet.'),
(12, 'Volunteer for a cause you care about.'),
(13, 'Write in a personal journal.'),
(14, 'Practice progressive muscle relaxation.'),
(15, 'Engage in creative writing or poetry.'),
(16, 'Take a hot bath or shower.'),
(17, 'Visit a museum or art gallery.'),
(18, 'Go on a bike ride.'),
(19, 'Join a book club.'),
(20, 'Try gardening or caring for houseplants.'),
(21, 'Declutter and organize your living space.'),
(22, 'Paint or draw.'),
(23, 'Attend a local community event.'),
(24, 'Practice mindfulness while eating.'),
(25, 'Go to a local coffee shop or cafe.'),
(26, 'Set boundaries to protect your time.'),
(27, 'Dance to your favorite music.'),
(28, 'Explore a new hobby or craft.'),
(29, 'Try aromatherapy with essential oils.'),
(30, 'Play a board game or card game.'),
(31, 'Take a digital detox day.'),
(32, 'Explore a new part of your city or town.'),
(33, 'Try a new type of cuisine.'),
(34, 'Watch the sunset or sunrise.'),
(35, 'Attend a live performance or concert.'),
(36, 'Engage in a DIY home improvement project.'),
(37, 'Take up a musical instrument.'),
(38, 'Host a virtual game night with friends.'),
(39, 'Learn a new language.'),
(40, 'Solve puzzles or brain teasers.'),
(41, 'Practice positive affirmations.'),
(42, 'Read a self-help or personal development book.'),
(43, 'Plan a future vacation or trip.'),
(44, 'Set personal goals and track your progress.'),
(45, 'Enjoy a picnic in the park.'),
(46, 'Write a letter to a friend or family member.'),
(47, 'Visit a local farmers\' market.'),
(48, 'Try a new workout or fitness class.'),
(49, 'Explore a nearby nature trail.'),
(50, 'Participate in a charity run or walk.'),
(51, 'Take a scenic drive.'),
(52, 'Enjoy a spa day at home.'),
(53, 'Visit a botanical garden.'),
(54, 'Try a new restaurant or cafe in town.'),
(55, 'Watch educational TED Talks.'),
(56, 'Take up a martial art or self-defense class.'),
(57, 'Plan and prepare for a future project.'),
(58, 'Explore a nearby beach or lake.'),
(59, 'Try adult coloring books or puzzles.'),
(60, 'Take a scenic train or bus ride.'),
(61, 'Host a virtual movie night with friends.'),
(62, 'Listen to motivational podcasts.'),
(63, 'Take a class or workshop online.'),
(64, 'Write a list of things you\'re proud of.'),
(65, 'Practice random acts of kindness.'),
(66, 'Create a vision board for your goals.'),
(67, 'Go stargazing.'),
(68, 'Try outdoor photography.'),
(69, 'Explore a new trail on a bike.'),
(70, 'Take up birdwatching.'),
(71, 'Create and follow a daily routine.'),
(72, 'Learn about a new culture or history.'),
(73, 'Practice time management techniques.'),
(74, 'Watch a documentary.'),
(75, 'Explore a new neighborhood by walking.'),
(76, 'Try a new form of art or craft.'),
(77, 'Take a scenic boat ride.'),
(78, 'Attend a meditation or mindfulness retreat.'),
(79, 'Write a list of your strengths and talents.'),
(80, 'Set aside time for self-reflection.'),
(81, 'Practice mindfulness while eating.'),
(82, 'Host a themed dinner night at home.'),
(83, 'Watch inspiring TED Talks.'),
(84, 'Explore a new park or nature reserve.'),
(85, 'Try journaling prompts for self-discovery.'),
(86, 'Participate in an online support group.'),
(87, 'Learn about a new philosophy or worldview.'),
(88, 'Try geocaching or treasure hunting.'),
(89, 'Join a local sports league or club.'),
(90, 'Create a scrapbook of cherished memories.'),
(91, 'Practice positive self-talk and self-compassion.'),
(92, 'Visit a historic site or museum.'),
(93, 'Try a local art or pottery class.'),
(94, 'Attend a workshop on stress management.'),
(95, 'Take a weekend getaway to a new city.'),
(96, 'Explore a new hiking trail or mountain.'),
(97, 'Try a new form of dance or movement.'),
(98, 'Host a virtual talent show with friends.'),
(99, 'Join a local environmental or conservation group.'),
(100, 'Create a playlist of your favorite uplifting songs.\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `disorder_tbl`
--

CREATE TABLE `disorder_tbl` (
  `id` int(11) NOT NULL,
  `disorder_name` varchar(255) NOT NULL,
  `about` varchar(1000) NOT NULL,
  `category` varchar(255) NOT NULL,
  `symptoms` varchar(1000) NOT NULL,
  `recommendations` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `disorder_tbl`
--

INSERT INTO `disorder_tbl` (`id`, `disorder_name`, `about`, `category`, `symptoms`, `recommendations`) VALUES
(1, 'Generalized Anxiety Disorder (GAD)', 'Excessive worry, restlessness, muscle tension, and difficulty concentrating.', 'Anxiety Disorders\r\n', 'Excessive and uncontrollable worry about various aspects of life.\r\nRestlessness or feeling on edge.\r\nMuscle tension.\r\nFatigue.\r\nDifficulty concentrating or mind going blank.\r\nIrritability.\r\nSleep disturbances, such as trouble falling asleep or staying asleep', 'Consult with a psychiatrist to discuss medication options. Anti-anxiety medications or antidepressants may be prescribed to manage symptoms. It\'s important to follow your healthcare provider\'s guidance regarding medication.'),
(2, 'Panic Disorder', 'Recurrent and unexpected panic attacks, often accompanied by physical symptoms like rapid heartbeat and sweating.', 'Anxiety Disorders', 'Recurrent and unexpected panic attacks, which are sudden surges of intense fear or discomfort.\r\nPalpitations, pounding heart, or accelerated heart rate.\r\nSweating.\r\nTrembling or shaking.\r\nShortness of breath or a feeling of being smothered.\r\nFeeling of choking.\r\nChest pain or discomfort.\r\nNausea or abdominal distress.\r\nFeeling dizzy, lightheaded, or faint.\r\nFear of losing control or going crazy.\r\nFear of dying.\r\nPersistent worry about having another panic attack (anticipatory anxiety).', ''),
(3, 'Social Anxiety Disorder (Social Phobia)', 'Fear of social situations, avoidance of social interactions, and extreme self-consciousness.', 'Anxiety Disorders', 'Intense fear or anxiety in social situations where one might be scrutinized or judged by others.\r\nFear of embarrassment or humiliation.\r\nAvoidance of social situations or enduring them with intense anxiety.\r\nPhysical symptoms like blushing, sweating, trembling, or a shaky voice in social situations.\r\nRecognizing that the fear is excessive or unreasonable.', ''),
(4, 'Specific Phobias', 'Intense and irrational fear of specific objects or situations (e.g., spiders, flying).', 'Anxiety Disorders', 'Intense fear and avoidance of a specific object or situation (e.g., flying, spiders, heights).\r\nImmediate anxiety response upon encountering the feared object or situation.\r\nAvoidance behaviors or enduring the situation with intense distress.\r\nThe fear is excessive or unreasonable.', '');

-- --------------------------------------------------------

--
-- Table structure for table `doctors_info_tbl`
--

CREATE TABLE `doctors_info_tbl` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `birthday` varchar(255) NOT NULL,
  `age` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contactNo` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userImage` text NOT NULL,
  `jobTitle` varchar(255) NOT NULL,
  `hostpital` varchar(255) NOT NULL,
  `career` varchar(10) NOT NULL,
  `experience` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors_info_tbl`
--

INSERT INTO `doctors_info_tbl` (`id`, `firstName`, `lastName`, `birthday`, `age`, `gender`, `address`, `email`, `contactNo`, `username`, `password`, `userImage`, `jobTitle`, `hostpital`, `career`, `experience`) VALUES
(1, 'Marcel de', 'Roos', '03/19/1956', '63', 'Male', '103 Pagoda Rd, Sri Jayawardenepura Kotte 10100', 'marcelde32@gmail.com', '0772310869', 'marcel', 'roos123', 'uploads/psychologist-colombo.jpg', 'Physiotherapist', 'Amsterdam UMC Netherlands', '30', 'general psychology practice in a residential area near Kalubowila Hospital. I work with adults to expat issues, marriage counselling, depression, anxiety, sexual problems, addictions, trauma therapy, stress, personal development, giving meaning to your life, how to build self-esteem, choosing a profession and career advice, social issues, etc. And with children for teenager counselling, study related problems, personal and social issues, etc.\r\nI am affiliate psychologist with the Academy of Design (AOD) in Colombo for their students and staff members.');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_events_tbl`
--

CREATE TABLE `doctor_events_tbl` (
  `event_id` int(11) NOT NULL,
  `docId` int(11) NOT NULL,
  `date` varchar(50) NOT NULL,
  `time` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_events_tbl`
--

INSERT INTO `doctor_events_tbl` (`event_id`, `docId`, `date`, `time`, `title`, `description`) VALUES
(2, 1, '10/28/2023', '11:29', 'meeting', 'tyryty'),
(3, 1, '11/05/2023', '09:00', 'session-01', 'none'),
(8, 1, '11/26/2023', '00:55', 'testing', 'asdasdasda'),
(9, 1, '11/26/2023', '09:00', 'session-01', 'complete the test before the date');

-- --------------------------------------------------------

--
-- Table structure for table `emailverifying`
--

CREATE TABLE `emailverifying` (
  `id` int(11) NOT NULL,
  `email` text NOT NULL,
  `verification_code` text NOT NULL,
  `sendTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `status2` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emailverifying`
--

INSERT INTO `emailverifying` (`id`, `email`, `verification_code`, `sendTime`, `status2`) VALUES
(116, 'ishushayka81@gmail.com', '240849', '2024-02-20 22:41:39', 'alive'),
(117, 'pavithmadhusithjayasinghe@gmail.com', '476499', '2024-02-21 06:07:04', 'alive'),
(118, 'sanjanaabesiri1234567@gmail.com', '699072', '2024-02-21 06:14:20', 'alive'),
(119, 'sanjanaabeysiri1234567@gmail.com', '190069', '2024-02-21 06:16:28', 'alive'),
(120, 'tharanadeshan@gmail.com', '274313', '2024-02-21 06:42:50', 'alive'),
(121, 'dpdilshan9@gmail.com', '786792', '2024-02-21 07:11:27', 'alive'),
(122, 'gnadishani@gmail.com', '854432', '2024-02-21 08:04:23', 'alive'),
(123, 'gnadishani@gmail.com', '578992', '2024-02-21 08:04:23', 'alive'),
(125, 'ashanavishka81@gmail.com', '412046', '2024-02-21 19:06:59', 'alive');

-- --------------------------------------------------------

--
-- Table structure for table `emotions_tbl`
--

CREATE TABLE `emotions_tbl` (
  `id` int(11) NOT NULL,
  `emotion` varchar(255) NOT NULL,
  `words` varchar(500) NOT NULL,
  `recommendation` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emotions_tbl`
--

INSERT INTO `emotions_tbl` (`id`, `emotion`, `words`, `recommendation`) VALUES
(1, 'sad', 'Sad\r\nMelancholy\r\nSorrow\r\nGrief\r\nDespair\r\nBlue\r\nDejected\r\nWoeful\r\nMournful\r\nDepressed\r\nDismal\r\nCrestfallen\r\nDisheartened\r\nForlorn\r\nDowncast\r\nWistful\r\nSomber\r\nGloomy\r\nHeavy-hearted\r\nMorose\r\nUnhappy', 'Be kind to yourself. Understand that it\'s okay to feel sad, and it\'s a normal part of the human experience. Treat yourself with the same kindness and understanding you would offer to a friend.'),
(2, 'heartbroken', 'Desolate\r\nCrushed\r\nDevastated\r\nBrokenhearted\r\nBereft\r\nShattered\r\nWounded\r\nSorrowful\r\nGrieving\r\nAbandoned\r\nBetrayed\r\nDisconsolate\r\nMournful\r\nUnrequited\r\nDejected\r\nForsaken\r\nMelancholic\r\nPained\r\nDisheartened\r\nDespondent', 'Use this challenging period as an opportunity for personal growth and self-discovery. Explore your interests, set new goals, and invest in your own development.'),
(3, 'pain', 'Pain\r\nAgony\r\nSuffering\r\nTorment\r\nAnguish\r\nDistress\r\nHurt\r\nAche\r\nThrobbing\r\nStinging\r\nPounding\r\nSmarting\r\nTwinge\r\nPangs\r\nStabbing\r\nTenderness\r\nExcruciating\r\nAffliction\r\nMisery\r\nWoe\r\nDiscomfort', 'Engage in activities that bring joy, fulfillment, and a sense of accomplishment. Positive experiences can counterbalance emotional pain and contribute to an improved mood.'),
(4, 'alone', 'Isolation\r\nSolitude\r\nAbandonment\r\nSeclusion\r\nDesertion\r\nRejection\r\nAlienation\r\nForsaken\r\nDesolation\r\nWithdrawal\r\nLoner\r\nAlone\r\nSolitary\r\nEstrangement\r\nDespair\r\nNeglect\r\nExclusion\r\nDetachment\r\nEmptiness\r\nSegregation', 'Engage in activities or hobbies that bring you joy and fulfillment. Pursuing interests can lead to meeting new people and expanding your social circle.'),
(5, 'anger', 'Angry\r\nFury\r\nWrath\r\nRage\r\nResentment\r\nIndignation\r\nHostility\r\nIrritation\r\nAgitation\r\nAnnoyance\r\nFrustration\r\nOutrage\r\nEnraged\r\nBitterness\r\nVexation\r\nAnimosity\r\nInfuriated\r\nExasperation\r\nIrate\r\nMad', 'Practice deep breathing or mindfulness to manage immediate anger, and explore healthier ways of expressing and processing anger, such as through communication or physical activity.'),
(6, 'fear', 'Fear\r\nAnxiety\r\nDread\r\nPanic\r\nApprehension\r\nTrepidation\r\nPhobia\r\nUnease\r\nNervousness\r\nTerror\r\nAlarm\r\nFright\r\nHesitation\r\nWorry\r\nJitters\r\nTimidity\r\nOverwhelmed\r\nShyness\r\nParanoia\r\nInsecurity', 'Gradually confront and expose yourself to feared situations in a safe way (if appropriate), and consider cognitive-behavioral therapy to address irrational fears.'),
(7, 'guilt', 'Guilt\r\nRemorse\r\nShame\r\nRepentance\r\nRegret\r\nSelf-reproach\r\nContrition\r\nBlame\r\nConscience-stricken\r\nApologetic\r\nAshamed\r\nSelf-condemnation\r\nSorrowful\r\nPenitent\r\nGuilty conscience\r\nCompunction\r\nRueful\r\nApology\r\nWrongdoing', 'Reflect on the specific actions causing guilt, take responsibility, and if necessary, make amends. Seek forgiveness, both from others and yourself.'),
(8, 'shame', 'Shame\r\nEmbarrassment\r\nHumiliation\r\nDisgrace\r\nMortification\r\nIndignity\r\nRegret\r\nInferiority\r\nAwkwardness\r\nSelf-consciousness\r\nStigma\r\nAbashment\r\nReproach\r\nChagrin\r\nSelf-reproach\r\nGuilt\r\nHesitation\r\nDishonor\r\nDiscomfort\r\nSelf-disgust', 'Challenge negative self-perceptions, practice self-compassion, and consider therapy to explore and address the roots of shame.'),
(9, 'regret', 'Remorse\r\nSorrow\r\nApology\r\nContrition\r\nRepentance\r\nGuilt\r\nPenitence\r\nLament\r\nSelf-reproach\r\nApologetic\r\nSelf-blame\r\nRueful\r\nWistful\r\nSorry\r\nSadness\r\nDisappointment\r\nMisgiving\r\nLamentation\r\nGrief', 'Learn from the experience, focus on personal growth, and consider making positive changes moving forward.'),
(10, 'anxiety', 'Anxiety\r\nWorry\r\nNervousness\r\nApprehension\r\nTension\r\nUneasiness\r\nRestlessness\r\nJitters\r\nAgitation\r\nFearfulness\r\nDread\r\nOverwhelmed\r\nPanic\r\nTrepidation\r\nInsecurity\r\nEdginess\r\nFretfulness\r\nConcern\r\nRestive\r\nApprehensive', 'Practice relaxation techniques, challenge anxious thoughts, and consider therapy to develop coping strategies.'),
(11, 'Disappointment', 'Disappointment\r\nLetdown\r\nRegret\r\nDismay\r\nFrustration\r\nChagrin\r\nDiscouragement\r\nDefeat\r\nDespondency\r\nUnfulfilled\r\nDisillusionment\r\nDispleasure\r\nDiscontent\r\nLetdown\r\nDownhearted\r\nResigned\r\nDejected\r\nUnmet expectations\r\nDisapproval\r\nDissatisfaction', 'Acknowledge the disappointment, reevaluate expectations, and focus on finding alternative sources of fulfillment.'),
(12, 'Resentment', 'Bitterness\r\nIndignation\r\nGrudge\r\nAnimosity\r\nHostility\r\nRancor\r\nEnmity\r\nVindictiveness\r\nDispleasure\r\nMalice\r\nFury\r\nHatred\r\nResentment\r\nDiscontent\r\nWrath\r\nOffense\r\nOffended\r\nDisgruntled\r\nUnforgiving\r\nIll will', 'Communicate openly about feelings, practice forgiveness, and set healthy boundaries to prevent further resentment.'),
(13, 'Frustration', 'Frustration\r\nDisappointment\r\nDefeat\r\nSetback\r\nIrritation\r\nImpatience\r\nHindered\r\nFoiled\r\nThwarted\r\nAggravation\r\nAnnoyance\r\nUnfulfilled\r\nVexation\r\nHindered\r\nBlocked\r\nSnag\r\nObstacle\r\nImpediment\r\nExasperation', 'Identify the source of frustration, break down tasks into smaller steps, and explore problem-solving strategies.'),
(14, 'Envy', 'Envy\r\nJealousy\r\nCovetousness\r\nResentment\r\nDiscontent\r\nGreen-eyed\r\nGrudging\r\nLonging\r\nSpite\r\nDesire\r\nBitterness\r\nAvarice\r\nLust\r\nHatred\r\nDispleasure\r\nRivalry\r\nJealous\r\nPossessiveness\r\nMalice\r\nGreed', 'Shift focus to personal strengths and accomplishments, practice gratitude, and cultivate contentment with one\'s own life.'),
(15, 'Despair', 'Despair\r\nHopelessness\r\nDespondency\r\nDejection\r\nGloom\r\nWretchedness\r\nMisery\r\nDiscouragement\r\nMelancholy\r\nResignation\r\nDismay\r\nSuffering\r\nAbandonment\r\nDefeat\r\nLamentation\r\nAnguish\r\nDisheartenment\r\nForlornness\r\nDistress\r\nPowerlessness', 'Seek support from loved ones, engage in activities that bring comfort, and consider professional help for coping strategies.'),
(16, 'Irritation', 'Irritation\r\nAnnoyance\r\nAgitation\r\nDispleasure\r\nFrustration\r\nVexation\r\nPeevishness\r\nGrumpiness\r\nExasperation\r\nImpatience\r\nBotheration\r\nTestiness\r\nCrossness\r\nUpset\r\nRestlessness\r\nTetchiness', 'Identify triggers for irritation, practice mindfulness, and communicate assertively to address the root causes.'),
(17, 'Hostility', 'Hostility\r\nAggression\r\nAntagonism\r\nBelligerence\r\nAnimosity\r\nResentment\r\nHatred\r\nEnmity\r\nMalice\r\nDefensiveness\r\nContempt\r\nAggravation\r\nIrritability\r\nAnimus\r\nConfrontation\r\nHostile\r\nAnger\r\nTension\r\nCombativeness\r\nAdversarial\r\nFierceness', 'Explore anger management techniques, such as deep breathing or physical exercise, and consider therapy to address underlying issues.'),
(18, 'Insecurity', 'Insecurity\r\nUncertainty\r\nDoubt\r\nSelf-doubt\r\nApprehension\r\nInstability\r\nVulnerability\r\nFearfulness\r\nSelf-consciousness\r\nInferiority\r\nAnxiety\r\nUnease\r\nLack of confidence\r\nUnsureness\r\nInadequacy\r\nHesitation\r\nShyness\r\nSelf-esteem issues\r\nWorry\r\nDependence\r\nInstability', 'Challenge negative self-perceptions, focus on strengths and achievements, and seek validation from within rather than relying solely on external sources.'),
(19, 'Disgust', 'Disgust\r\nRevulsion\r\nRepulsion\r\nAbhorrence\r\nLoathing\r\nNausea\r\nAversion\r\nRepugnance\r\nOdium\r\nContempt\r\nDetestation\r\nAbomination\r\nAberration\r\nDislike\r\nDismay\r\nSickness\r\nAntipathy\r\nScorn\r\nHatefulness\r\nDespise\r\nDispleasure', 'Identify the source of disgust, challenge automatic negative reactions, and work towards understanding or acceptance.'),
(20, 'Confusion', 'Confuse\r\nBewilderment\r\nPerplexity\r\nDisarray\r\nDisorientation\r\nBafflement\r\nDistraction\r\nFogginess\r\nPuzzlement\r\nUncertainty\r\nChaos\r\nMuddle\r\nJumble\r\nHaze\r\nTangle\r\nDaze\r\nDisconcertion\r\nUnclear\r\nTurmoil\r\nCommotion\r\nDisorder', 'Break down complex issues into smaller parts, seek clarification, and consider seeking advice from knowledgeable sources.'),
(21, 'Helplessness', 'Helpless\r\nPowerlessness\r\nVulnerability\r\nInability\r\nDependency\r\nWeakness\r\nIneffectiveness\r\nFutility\r\nHopelessness\r\nIncapacity\r\nDefenselessness\r\nSubjugation\r\nDesperation\r\nImpotence\r\nDependence\r\nSubmission\r\nForlornness\r\nDejection\r\nInferiority\r\nDefeat\r\nDisempowerment', 'Identify areas where control can be regained, seek support from others, and explore problem-solving strategies.'),
(22, 'Jealousy', 'Jealous\r\nEnvy\r\nCovetousness\r\nResentment\r\nDiscontent\r\nGreen-eyed\r\nGrudging\r\nLonging\r\nSpite\r\nDesire\r\nBitterness\r\nAvarice\r\nLust\r\nHatred\r\nDispleasure\r\nRivalry\r\nJealous\r\nPossessiveness\r\nMalice\r\nGreed', 'Recognize and challenge irrational thoughts, practice gratitude for your own strengths, and communicate openly about feelings.');

-- --------------------------------------------------------

--
-- Table structure for table `logindetailstbl`
--

CREATE TABLE `logindetailstbl` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `logindetailstbl`
--

INSERT INTO `logindetailstbl` (`username`, `password`, `contact`) VALUES
('admin', 'admin123', '');

-- --------------------------------------------------------

--
-- Table structure for table `monthly_progress_tbl`
--

CREATE TABLE `monthly_progress_tbl` (
  `progressID` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `month` varchar(50) NOT NULL,
  `progress` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `monthly_progress_tbl`
--

INSERT INTO `monthly_progress_tbl` (`progressID`, `pid`, `month`, `progress`) VALUES
(1, 73, 'January', '10%'),
(2, 73, 'February', '60%'),
(3, 73, 'March', '65%'),
(4, 73, 'April', '80%'),
(5, 73, 'May', '70%'),
(6, 73, 'June', '25%'),
(7, 73, 'July', '40%'),
(8, 73, 'August', '60%'),
(9, 73, 'September', '75%'),
(10, 73, 'Octomber', '70%'),
(11, 73, 'November', '50%'),
(12, 73, 'December', '60%');

-- --------------------------------------------------------

--
-- Table structure for table `new_patients_tbl`
--

CREATE TABLE `new_patients_tbl` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `birthday` varchar(50) NOT NULL,
  `age` varchar(11) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `address` varchar(500) NOT NULL,
  `eMail` varchar(255) NOT NULL,
  `contactNo1` varchar(50) NOT NULL,
  `contactNo2` varchar(50) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userImage` text NOT NULL,
  `docId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `new_patients_tbl`
--

INSERT INTO `new_patients_tbl` (`id`, `firstName`, `lastName`, `birthday`, `age`, `gender`, `address`, `eMail`, `contactNo1`, `contactNo2`, `username`, `password`, `userImage`, `docId`) VALUES
(1, 'Danerys', 'Targarian', '25/02/1846', '68', 'Female', 'Kingsland', 'daniTargarian23@gmail.com', '0324553435', '0354554569', 'dani', 'fire123', 'uploads\\dani.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notifications_tbl`
--

CREATE TABLE `notifications_tbl` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications_tbl`
--

INSERT INTO `notifications_tbl` (`id`, `title`, `message`, `type`) VALUES
(12, 'testing notification', 'this is for testing', 'message'),
(13, 'Report send successfull', 'Your report has been sent to your doctor. After doctor approved the report you will receive a notification.', 'message'),
(14, 'Report send successfull', 'Your report has been sent to your doctor. After doctor approved the report you will receive a notification.', 'message');

-- --------------------------------------------------------

--
-- Table structure for table `patients_info_tbl`
--

CREATE TABLE `patients_info_tbl` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `birthday` varchar(255) NOT NULL,
  `age` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `eMail` varchar(255) NOT NULL,
  `contactNo1` varchar(255) NOT NULL,
  `contactNo2` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userImage` text NOT NULL,
  `docId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients_info_tbl`
--

INSERT INTO `patients_info_tbl` (`id`, `firstName`, `lastName`, `birthday`, `age`, `gender`, `address`, `eMail`, `contactNo1`, `contactNo2`, `username`, `password`, `userImage`, `docId`) VALUES
(73, 'Ashan', 'Avishka', '02/25/2001', '22', 'Male', '118A,Kalugalamulla,Kirinda,Puhulwella.', 'ashanavishka812@gmail.com', '0783467859', '0715249452', 'avii47', 'qwert123', 'uploads/366734868_835159804895462_23051642186478489_n.jpg', 1),
(74, 'Steven', 'Smith', '10/18/1997', '26', 'Male', '112A,sidny,Australiar', 'smith12@gmail.com', '1234567890', '2345674345', 'steven', '', 'uploads\\steven.jpeg', 1),
(75, 'Virat', 'Koli', '03/19/1986', '35', 'Male', '221B, Lahor, India', 'virat12@gmail.coom', '1234567890', '3424234233', 'virat', '', 'uploads\\virat.jpeg', 1),
(78, 'Sherlock', 'Holmes', '07/22/1986', '57', 'Male', '221B,Bakers street, London', 'sherlock12@gmail.com', '0783467859', '0715249452', 'sherlock', '', 'uploads\\sherlock.webp', 1),
(79, 'Kumar', 'Sangakkara', '', '', '', '', '', '', '', '', '', 'uploads\\kumar-sangakkara-1414396559.webp', 1),
(80, 'Mohomad', 'Rizwan', '', '', '', '', '', '', '', '', '', 'uploads\\10rizwan-win.jpeg', 1),
(81, 'Wanindu', 'Hasaranga', '', '', '', '', '', '', '', '', '', 'uploads\\wanindu.jpg', 1),
(82, 'David', 'Wanner', '', '', '', '', '', '', '', '', '', 'uploads\\wanner.jpeg', 1),
(83, 'Jos', 'Buttler', '', '', '', '', '', '', '', '', '', 'uploads\\buttler.jpeg', 1),
(91, 'Yemodya', 'Savindi', '02/25/2001', '22', 'Female', '', 'ashanavishka81@gmail.com', '7021002956', '', 'yemo', 'avii123', 'uploads/default user icon.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `patient_doc_msg_tbl`
--

CREATE TABLE `patient_doc_msg_tbl` (
  `msgId` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `docId` int(11) NOT NULL,
  `docMsg` varchar(500) NOT NULL,
  `patientMsg` varchar(500) NOT NULL,
  `timeStamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient_doc_msg_tbl`
--

INSERT INTO `patient_doc_msg_tbl` (`msgId`, `pid`, `docId`, `docMsg`, `patientMsg`, `timeStamp`) VALUES
(27, 73, 1, 'hello', '', '2023-10-25 16:14:14'),
(28, 73, 1, '', 'hy', '2023-10-25 16:14:29'),
(29, 73, 1, '', 'how about the next therapy', '2023-10-25 16:17:05'),
(30, 73, 1, '', 'doctor', '2023-10-25 16:22:16'),
(31, 73, 1, 'I will inform you soon about that', '', '2023-10-25 16:23:31'),
(32, 73, 1, '', 'ok doctor', '2023-10-25 16:23:46'),
(33, 73, 1, 'fine then', '', '2023-10-27 14:48:37'),
(34, 73, 1, '', 'ok', '2023-10-27 14:49:01'),
(35, 74, 1, 'hello doctor', '', '2023-10-27 14:52:55'),
(36, 75, 1, 'hello virat', '', '2023-10-27 14:55:07'),
(37, 75, 1, '', 'hello doctor', '2023-10-27 14:55:22'),
(38, 75, 1, 'hello', '', '2023-10-27 16:20:52'),
(39, 73, 1, '', 'hello', '2024-01-27 07:43:06'),
(40, 73, 1, '', 'https://teams.live.com/meet/9566196064511?p=1JTjTV8zqNW6fqZs', '2024-02-05 20:06:28'),
(41, 73, 1, '', 'hy', '2024-02-21 08:11:57');

-- --------------------------------------------------------

--
-- Table structure for table `patient_events_tbl`
--

CREATE TABLE `patient_events_tbl` (
  `event_id` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `date` varchar(50) NOT NULL,
  `time` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient_events_tbl`
--

INSERT INTO `patient_events_tbl` (`event_id`, `pid`, `date`, `time`, `title`, `description`) VALUES
(30, 73, '10/26/2023', '09:00', 'session-02', 'complete the test before the date'),
(33, 73, '11/26/2023', '22:00', 'testing', 'testing 1'),
(36, 73, '1/31/2024', '02:12', 'meet the doctor', 'jgvjcj'),
(38, 73, '2/21/2024', '10:00', 'meeting ', 'wqeqwqwerer'),
(40, 73, '2/22/2024', '14:52', 'therapy1.2', 'cxdgxzd');

-- --------------------------------------------------------

--
-- Table structure for table `patient_requests_tbl`
--

CREATE TABLE `patient_requests_tbl` (
  `reqId` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `docId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient_requests_tbl`
--

INSERT INTO `patient_requests_tbl` (`reqId`, `pid`, `docId`) VALUES
(2, 73, 1),
(4, 73, 1),
(5, 73, 1);

-- --------------------------------------------------------

--
-- Table structure for table `pw_reset_tbl`
--

CREATE TABLE `pw_reset_tbl` (
  `resetId` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `userRole` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `OTP` varchar(255) NOT NULL,
  `sendTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `status1` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pw_reset_tbl`
--

INSERT INTO `pw_reset_tbl` (`resetId`, `id`, `userRole`, `email`, `OTP`, `sendTime`, `status1`) VALUES
(12, 73, 'patient', 'ashanavishka81@gmail.com', '239047', '2024-02-21 00:13:06', 'alive'),
(13, 73, 'patient', 'ashanavishka81@gmail.com', '894796', '2024-02-21 00:17:42', 'alive'),
(14, 73, 'patient', 'ashanavishka81@gmail.com', '523939', '2024-02-21 08:20:37', 'alive');

-- --------------------------------------------------------

--
-- Table structure for table `report_data_tbl`
--

CREATE TABLE `report_data_tbl` (
  `repId` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `docId` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `userImg` text NOT NULL,
  `primaryConcern` varchar(255) NOT NULL,
  `diagnosis` varchar(255) NOT NULL,
  `symptoms` varchar(255) NOT NULL,
  `treatmentPlan` varchar(255) NOT NULL,
  `additionalNotes` varchar(255) NOT NULL,
  `disorder1` varchar(255) NOT NULL,
  `disorder2` varchar(255) NOT NULL,
  `disorder3` varchar(255) NOT NULL,
  `about1` varchar(255) NOT NULL,
  `about2` varchar(255) NOT NULL,
  `about3` varchar(255) NOT NULL,
  `approval` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report_data_tbl`
--

INSERT INTO `report_data_tbl` (`repId`, `pid`, `docId`, `userName`, `age`, `gender`, `email`, `userImg`, `primaryConcern`, `diagnosis`, `symptoms`, `treatmentPlan`, `additionalNotes`, `disorder1`, `disorder2`, `disorder3`, `about1`, `about2`, `about3`, `approval`) VALUES
(5, 73, 1, 'Ashan Avishka', 22, 'Male', 'ashanavishka81@gmail.com', 'uploads/366734868_835159804895462_23051642186478489_n.jpg', 'Anxiety and Panic Attacks', 'Generalized Anxiety Disorder', 'Restlessness, racing thoughts, difficulty breathing', 'Cognitive-Behavioral Therapy, Medications', 'Ashan has a history of family anxiety disorders.', 'Generalized Anxiety Disorder (GAD)', ' Panic Disorder', '', 'Excessive worry, restlessness, muscle tension, and difficulty concentrating.', 'Recurrent and unexpected panic attacks, often accompanied by physical symptoms like rapid heartbeat and sweating.', '', 1),
(6, 91, 1, 'Yemodya Savindi', 22, 'Female', 'ashanavishka81@gmail.com', 'uploads/default user icon.png', 'Anxiety and Panic Attacks', 'Generalized Anxiety Disorder', 'Restlessness, racing thoughts, difficulty breathing', 'Cognitive-Behavioral Therapy, Medications', 'Ashan has a history of family anxiety disorders.', 'Generalized Anxiety Disorder (GAD)', ' Panic Disorder', '', 'Excessive worry, restlessness, muscle tension, and difficulty concentrating.', 'Recurrent and unexpected panic attacks, often accompanied by physical symptoms like rapid heartbeat and sweating.', '', 0),
(7, 91, 1, 'Yemodya Savindi', 22, 'Female', 'ashanavishka81@gmail.com', 'uploads/default user icon.png', 'Anxiety and Panic Attacks', 'Generalized Anxiety Disorder', 'Restlessness, racing thoughts, difficulty breathing', 'Cognitive-Behavioral Therapy, Medications', 'Ashan has a history of family anxiety disorders.', 'Generalized Anxiety Disorder (GAD)', ' Panic Disorder', '', 'Excessive worry, restlessness, muscle tension, and difficulty concentrating.', 'Recurrent and unexpected panic attacks, often accompanied by physical symptoms like rapid heartbeat and sweating.', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `report_data_tbl2`
--

CREATE TABLE `report_data_tbl2` (
  `reqId` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `docId` int(11) NOT NULL,
  `approval` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report_data_tbl2`
--

INSERT INTO `report_data_tbl2` (`reqId`, `pid`, `docId`, `approval`) VALUES
(2, 73, 1, 'false');

-- --------------------------------------------------------

--
-- Table structure for table `testings`
--

CREATE TABLE `testings` (
  `id` int(11) NOT NULL,
  `test_name` varchar(50) NOT NULL,
  `intro` varchar(255) NOT NULL,
  `Q1` varchar(500) NOT NULL,
  `Q2` varchar(500) NOT NULL,
  `Q3` varchar(500) NOT NULL,
  `Q4` varchar(500) NOT NULL,
  `Q5` varchar(500) NOT NULL,
  `Q6` varchar(500) NOT NULL,
  `Q7` varchar(500) NOT NULL,
  `Q8` varchar(500) NOT NULL,
  `Q9` varchar(500) NOT NULL,
  `Q10` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testings`
--

INSERT INTO `testings` (`id`, `test_name`, `intro`, `Q1`, `Q2`, `Q3`, `Q4`, `Q5`, `Q6`, `Q7`, `Q8`, `Q9`, `Q10`) VALUES
(1, 'ADHD Test', 'Find out if you\'re experiencing the most common symptoms of ADHD.', 'I find it difficult finishing a task or project', 'I find it difficult to organise myself or a task', 'I find it difficult to remember appointments', 'If a task or project requires a lot of thought I will often delay in getting it started', 'I find it difficult to sit still and often fidget or squirm', 'I would describe myself as being ‘on the go’ and feel compelled to do things, as if driven by a motor’', 'I find it hard to remain focused in group settings', 'My mind feels very cluttered and it is hard for me to concentrate on one thing at a time', 'I make decisions quickly and fail to think through the consequences', 'I am often irritable, with a short fuse'),
(2, 'Anxiety Test', 'Find out if your anxiety could be a sign of something more serious.', 'I find it very hard to unwind, relax or sit still', 'I have had stomach problems, such as feeling sick or stomach cramps', 'I have been irritable and easily become annoyed', 'I have experienced shortness of breath', 'I have felt dizzy and unsteady at times', 'I have had difficulties with sleep (including waking early, finding it hard to go to sleep)', 'I have felt panicked and overwhelmed by things in my life', 'I have felt nervous and on edge', 'I have had trembling hands', 'I seem to be constantly worrying about things'),
(3, 'Bipolar Test', 'Find out if you are showing some of the symptoms of Bipolar Disorder.', 'Sometimes I am much more talkative than at other times', 'I have periods where I feel wired or hyper and am really active', 'I have periods where I feel really irritable or speeded up', 'I have had times where I am both depressed and elated at the same time', 'There are large variations in the quantity and quality of my work depending on my mood', '\r\nI have periods where I cry a great deal and then at other times I feel really happy and joke or laugh excessively', 'I have times where I feel really optimistic about life and other times where I feel there is no hope', 'There are times where I have a lot more interest in sex than at other times', 'At times I feel really angry and hostile', 'I have periods of mental dullness and other periods of very creative thinking'),
(4, 'Depression Test', 'If you\'re unsure if you are depressed, our 5-minute test can help evaluate your mood.', 'I feel overwhelmingly sad at times', 'When I think of the future I feel hopeless', 'I feel like a complete failure', 'I get a lot of satisfaction / joy from doing things', 'I feel guilty about something most of the time', 'I feel like I am being punished', 'I feel disappointed (even disgusted) with myself', 'The bad things in my life aren’t all my fault', 'I am often on the brink of tears or cry', 'I feel irritated and annoyed by things in my life'),
(5, 'Autism Test', 'Are you experiencing the most common symptoms of autism? Find out using our online test.', 'I prefer to do things on my own, rather than with others.', 'I prefer doing things the same way - for instance my morning routine or trip to the supermarket', 'I find myself becoming strongly absorbed in something – even obsessional', 'I am very sensitive to noise and will wear earplugs or cover my ears in certain situations', 'Sometimes people say I am being rude, even though I think I am being polite.', 'I find it easy to imagine what characters from a book might look like.', 'I find it easy to talk in groups of people', 'I am more interested in finding out about ‘things’ than people', 'I find numbers, dates and strings of information fascinating', 'I prefer non-fiction books and films to fiction'),
(6, 'OCD Test', 'Find out if you are experiencing the most common symptoms of OCD.', 'I have saved up so many things that they get in the way.', 'I check things more often than necessary.', 'I get upset if objects are not arranged properly.', 'I feel compelled to count while I am doing things.', 'I find it difficult to touch an object when I know it has been touched by strangers or certain people.', 'I find it difficult to control my own thoughts.', 'I collect things I don’t need.', 'I repeatedly check doors, windows, drawers, etc.', 'I get upset if others change the way I have arranged things.', 'I feel I have to repeat certain numbers.'),
(7, 'PTSD Test', 'Are you experiencing the most common symptoms of PTSD? Find out using our online test.', 'Any reminder brought back feelings about the event/s', 'I had trouble staying asleep', 'Other things kept making me think about it', 'I felt irritable and angry', 'I avoided letting myself get upset when I thought about it or was reminded of it', 'I thought about the event when I didn\'t mean to', 'I felt as if the event hadn\'t happened or it wasn\'t real', 'I have stayed away from reminders about the situation', 'Images and pictures of the event pop into my mind', 'I have been jumpy and easily startled'),
(8, 'Stress Test', 'Find out if your feelings are a sign of something more serious.', 'I have found myself getting upset by quite trivial things', 'I have been aware of dryness of my mouth', 'I have experienced breathing difficulties', 'I have tended to overreact to situations', 'I have felt shakey – like my legs are going to give way', 'I have found myself getting upset easily', 'I have found myself getting impatient when I have been delayed in any way', 'I have experienced sweaty palms or perspiration for no physical reasons', 'I have felt scared or nervous for no good reason', 'I have been aware of my heart rate, even when I am not exercising'),
(9, 'Binge Eating Test', 'Find out if your eating habits could be a sign of a binge eating disorder ', 'I feel very self-conscious about my weight and body size – it stops me from socialising', 'I eat meals much more quickly than others and seem to eat a lot more than others as well', 'I feel in control of how much I eat', 'I often feel desperate that I can’t be more in control of what I eat', 'When I am bored I can’t help but eat, nothing can distract me', 'I often eat, even though I am not hungry, because it is a habit', 'Sometimes I eat because I am ‘mouth’ hungry but I spit the food out, so I don’t put on weight', 'I have strong feelings of self-hate or guilt if I overeat', 'It’s easy for me to get back on track with a diet or healthy eating regime', 'My life seems to be ‘feast’ or ‘famine’ with very little moderation'),
(10, 'Anorexia Test', 'Find out if you are experiencing the most common symptoms of Anorexia.', 'I am terrified of being overweight', 'I avoid eating when I am hungry', 'I find myself preoccupied with food', 'I have eating binges where I feel I might not be able to stop', 'I cut my food into small pieces before eating', 'I know the calorie content of everything I eat', 'I avoid foods high in carbohydrates', 'Others have said they want me to eat more', 'I have made myself vomit after eating', 'I feel extreme guilt after eating'),
(11, 'Orthorexia Test', 'Find out if you are experiencing the most common symptoms of Orthorexia.', 'I spend a lot of my life thinking about, choosing and preparing healthy food and this interfered with other areas of my life, such as friends, family and education.', 'If I eat food I regard as being unhealthy, I feel unclean, guilty and anxious.', 'Being near foods that I think of being unhealthy or ‘bad’ makes me feel nervous', 'I judge other people who eat foods that I think are unhealthy', 'My personal sense of happiness, self-esteem and peace is dependent on the purity and rightness of what I eat.', 'Sometimes I would like to relax what I think of as being ‘good foods’ for a special occasion, like a meal out, but I cannot (this question is only relevant if you don’t have a medical condition which means you can’t make an exception to your diet).', 'I have eliminated more and more foods from my list of ‘good’ foods.', 'I have a growing list of food rules – I believe these help me maintain or enhance my health.', 'I have lost more weight that most people say is good for me', 'I am showing signs of malnutrition, such as hair loss, feeling faint, loss of menstruation and skin problems.'),
(12, 'Bulimia Test', 'Find out if you are experiencing the most common symptoms of Bulimia.', 'Do you have a regular daily eating pattern?', 'Would you say you are a strict dieter?', 'If you break your diet, do you feel like a failure?', 'Do you count calories all the time, regardless of being on a diet?', 'Do you ever fast for a whole day as a way of controlling your weight?', 'Does your eating pattern severely disrupt your life?', 'Would you say food, or thoughts of food, dominates your life?', 'Do you ever eat so much that you become uncomfortably full?', 'Would you say you can control your eating?', 'Do you worry that you have very little control over what you eat?');

-- --------------------------------------------------------

--
-- Table structure for table `therapy_sessions_tbl`
--

CREATE TABLE `therapy_sessions_tbl` (
  `sid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `docId` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `date` varchar(50) NOT NULL,
  `startTime` varchar(50) NOT NULL,
  `endTime` varchar(50) NOT NULL,
  `description` varchar(500) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `therapy_sessions_tbl`
--

INSERT INTO `therapy_sessions_tbl` (`sid`, `pid`, `docId`, `title`, `date`, `startTime`, `endTime`, `description`, `status`) VALUES
(1, 73, 1, 'session-01', '02/25/2024', '04:25', '05:25', 'complete the test before the date', 'pending'),
(2, 74, 1, 'session-01', '11/06/2023', '09:00', '', 'complete the test before the date', 'pending'),
(3, 75, 1, 'session-01', '11/05/2023', '09:00', '', 'none', 'pending'),
(6, 78, 1, 'session-01', '11/13/2023', '09:00', '', 'none', 'pending'),
(7, 79, 1, 'session-01', '11/10/2023', '10:00', '', 'none', 'pending'),
(8, 80, 1, 'session-01', '11/15/2023', '10:00', '', 'none', 'pending'),
(9, 81, 1, 'session-01', '11/15/2023', '09:00', '', 'none', 'pending'),
(10, 82, 1, 'session-01', '11/16/2023', '09:00', '', 'none', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `therapy_settings_tbl`
--

CREATE TABLE `therapy_settings_tbl` (
  `reqId` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `docId` int(11) NOT NULL,
  `date` varchar(50) NOT NULL,
  `startTime` varchar(50) NOT NULL,
  `endTime` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `therapy_settings_tbl`
--

INSERT INTO `therapy_settings_tbl` (`reqId`, `sid`, `pid`, `docId`, `date`, `startTime`, `endTime`) VALUES
(38, 1, 73, 1, '11/22/2023', '01:52', '02:52'),
(39, 2, 73, 1, '11/23/2023', '04:53', '05:53'),
(40, 3, 73, 1, '11/24/2023', '01:08', '03:08'),
(41, 3, 73, 1, '11/24/2023', '01:08', '02:08'),
(42, 5, 73, 1, '11/25/2023', '01:34', '03:34'),
(43, 6, 73, 1, '02/08/2024', '12:18', '14:18'),
(44, 7, 73, 1, '09/22/2023', '17:12', '19:12'),
(45, 0, 73, 1, '02/25/2024', '08:15', '09:15');

-- --------------------------------------------------------

--
-- Table structure for table `user_disorder_tbl`
--

CREATE TABLE `user_disorder_tbl` (
  `pid` int(11) NOT NULL,
  `disorderList` varchar(255) NOT NULL,
  `primaryConcern` varchar(255) NOT NULL,
  `diagnosis` varchar(255) NOT NULL,
  `symptoms` varchar(500) NOT NULL,
  `treatmentPlan` varchar(255) NOT NULL,
  `additionalNotes` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_disorder_tbl`
--

INSERT INTO `user_disorder_tbl` (`pid`, `disorderList`, `primaryConcern`, `diagnosis`, `symptoms`, `treatmentPlan`, `additionalNotes`) VALUES
(91, 'Generalized Anxiety Disorder (GAD), Panic Disorder', 'Anxiety and Panic Attacks', 'Generalized Anxiety Disorder', 'Restlessness, racing thoughts, difficulty breathing', 'Cognitive-Behavioral Therapy, Medications', 'Ashan has a history of family anxiety disorders.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_scores_tbl`
--
ALTER TABLE `activity_scores_tbl`
  ADD PRIMARY KEY (`date`);

--
-- Indexes for table `annual_checkup_tbl`
--
ALTER TABLE `annual_checkup_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brainstorminfo_tbl`
--
ALTER TABLE `brainstorminfo_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `daily_activities_tbl`
--
ALTER TABLE `daily_activities_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `disorder_tbl`
--
ALTER TABLE `disorder_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctors_info_tbl`
--
ALTER TABLE `doctors_info_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_events_tbl`
--
ALTER TABLE `doctor_events_tbl`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `emailverifying`
--
ALTER TABLE `emailverifying`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `emotions_tbl`
--
ALTER TABLE `emotions_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `monthly_progress_tbl`
--
ALTER TABLE `monthly_progress_tbl`
  ADD PRIMARY KEY (`progressID`);

--
-- Indexes for table `new_patients_tbl`
--
ALTER TABLE `new_patients_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications_tbl`
--
ALTER TABLE `notifications_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patients_info_tbl`
--
ALTER TABLE `patients_info_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient_doc_msg_tbl`
--
ALTER TABLE `patient_doc_msg_tbl`
  ADD PRIMARY KEY (`msgId`);

--
-- Indexes for table `patient_events_tbl`
--
ALTER TABLE `patient_events_tbl`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `patient_requests_tbl`
--
ALTER TABLE `patient_requests_tbl`
  ADD PRIMARY KEY (`reqId`);

--
-- Indexes for table `pw_reset_tbl`
--
ALTER TABLE `pw_reset_tbl`
  ADD PRIMARY KEY (`resetId`);

--
-- Indexes for table `report_data_tbl`
--
ALTER TABLE `report_data_tbl`
  ADD PRIMARY KEY (`repId`);

--
-- Indexes for table `report_data_tbl2`
--
ALTER TABLE `report_data_tbl2`
  ADD PRIMARY KEY (`reqId`);

--
-- Indexes for table `testings`
--
ALTER TABLE `testings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `therapy_sessions_tbl`
--
ALTER TABLE `therapy_sessions_tbl`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `therapy_settings_tbl`
--
ALTER TABLE `therapy_settings_tbl`
  ADD PRIMARY KEY (`reqId`);

--
-- Indexes for table `user_disorder_tbl`
--
ALTER TABLE `user_disorder_tbl`
  ADD PRIMARY KEY (`pid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `annual_checkup_tbl`
--
ALTER TABLE `annual_checkup_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `brainstorminfo_tbl`
--
ALTER TABLE `brainstorminfo_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `daily_activities_tbl`
--
ALTER TABLE `daily_activities_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `disorder_tbl`
--
ALTER TABLE `disorder_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `doctor_events_tbl`
--
ALTER TABLE `doctor_events_tbl`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `emailverifying`
--
ALTER TABLE `emailverifying`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT for table `emotions_tbl`
--
ALTER TABLE `emotions_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `monthly_progress_tbl`
--
ALTER TABLE `monthly_progress_tbl`
  MODIFY `progressID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `notifications_tbl`
--
ALTER TABLE `notifications_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `patients_info_tbl`
--
ALTER TABLE `patients_info_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `patient_doc_msg_tbl`
--
ALTER TABLE `patient_doc_msg_tbl`
  MODIFY `msgId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `patient_events_tbl`
--
ALTER TABLE `patient_events_tbl`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `patient_requests_tbl`
--
ALTER TABLE `patient_requests_tbl`
  MODIFY `reqId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pw_reset_tbl`
--
ALTER TABLE `pw_reset_tbl`
  MODIFY `resetId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `report_data_tbl`
--
ALTER TABLE `report_data_tbl`
  MODIFY `repId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `report_data_tbl2`
--
ALTER TABLE `report_data_tbl2`
  MODIFY `reqId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `testings`
--
ALTER TABLE `testings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `therapy_sessions_tbl`
--
ALTER TABLE `therapy_sessions_tbl`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `therapy_settings_tbl`
--
ALTER TABLE `therapy_settings_tbl`
  MODIFY `reqId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

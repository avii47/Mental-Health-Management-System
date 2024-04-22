<?php
include('connection.php');
include('php-nlp-tools/autoloader.php');

use NlpTools\Tokenizers\WhitespaceTokenizer;
use NlpTools\Stemmers\PorterStemmer;
use NlpTools\FeatureFactories\FeatureFactoryTemplate;

// Function to preprocess and tokenize text
function preprocessAndTokenize($text) {
    $tokenizer = new WhitespaceTokenizer();
    $stemmer = new PorterStemmer();

    $text = strtolower($text);

    $pattern = '/[[:punct:]]/';
    $cleanedText = preg_replace($pattern, '', $text);

    $words = $tokenizer->tokenize($cleanedText);

    // Apply stemming to words
    $stemmedWords = array_map(function ($word) use ($stemmer) {
        return $stemmer->stem($word);
    }, $words);

    $commonWords = ["a","an","the","in","on","at","to","for","of","with","and","but","or"];
    $filteredWords = array_diff($stemmedWords, $commonWords);

    return $filteredWords;
}

// Function to classify user intent
function classifyIntent($userMessage) {
    // Define intent categories and their associated keywords
    $intentCategories = [
        'welcome' => ['hello', 'hi', 'hy'],
        'greetings' => ['good', 'morning', 'afternoon', 'evening'],
        'about' => ['who' , 'you'],
        'capabilities' => ['can', 'do', 'capable', 'intent', 'skill'],

        'need_guidence' => ['understand', 'idea', 'help', 'guidence', 'guide', 'imagine', 'wired', 'owefull', 'councious'],
        'negative_emotions' => ['feel', 'feeling', 'alone', 'broken', 'heartbroken', 'dissapoint', 'sad', 'wire', 'uncontrol', 'weak', 'disspoint', 'regret', 'angry', 'mad'],
        'search_symptoms' => ['symptom', 'symptoms', 'health issue', 'ache', 'pain', 'fever'],
        'search_disorders' => ['disorder', 'condition', 'illness', 'disease', 'sickness'],

        'find_treatment' => ['treatment', 'cure', 'remedy', 'relief', 'solution'],
        'get_medical_advice' => ['advice', 'recommendation', 'consultation', 'suggestion'],

        'technical_support' => ['function','method','find','where','how'],

        'locate_doctor' => ['doctor', 'physician', 'specialist', 'medical professional'],
        'book_appointment' => ['appointment', 'schedule', 'book', 'visit'],
        'check_symptoms' => ['check', 'verify', 'confirm', 'validate'],
        'request_prescription' => ['prescription', 'medication', 'drug', 'pharmacy'],
        'ask_about_tests' => ['test', 'screening', 'diagnosis', 'exam'],
        'get_health_information' => ['information', 'knowledge', 'education', 'awareness'],
        'emergency_help' => ['emergency', 'urgent', '911', 'crisis'],

        'yes' => ['yes', 'yp', 'yeah', 'sure', 'ok', 'absolutely', 'yh'],
        'no' => ['no', 'np', 'nope', 'not', "needn't", "don't"],

        'Check mental state' => ['check', 'state', 'status', 'condition','situation', 'dashboard'],
        'Annual checkup' => ['checkup', 'annual', 'continue', 'dashboard'],
        'Chat with your doctor' => ['chat', 'doctor', 'direct', 'message', 'dashboard'],
        'Next therapy' => ['next', 'therapy', 'session', 'clinic', 'dashboard'],
        'Daily activities' => ['daily', 'activity', 'dashboard'],
        'Bargraph' => ['bargraph', 'progress', 'dashboard'],
        'Add event' => ['add', 'event', 'manager', 'dashboard'],
        'Delete event' => ['delete', 'event', 'manager', 'dashboard'],
        'Search event' => ['search', 'event', 'manager', 'dashboard'],
        'Update event' => ['update', 'event', 'manager', 'dashboard'],
        'User details' => ['user', 'account', 'details', 'informations', 'data', 'dashboard'],
        'Chat' => ['chat', 'brainstorm', 'ai', 'bot'],
        'Test' => ['test', 'patient', 'disorder'],
        'Progress' => ['progress', 'daily', 'monthly', 'yearly', 'monitor'],
        'Report' => ['report', 'patient', 'helath', 'disorder']
        // Add more intent categories and keywords as needed
    ];

    // Tokenize and preprocess user message
    $userWords = preprocessAndTokenize($userMessage);

    // Initialize intent scores
    $intentScores = [];

    // Calculate intent scores based on keyword matching
    foreach ($intentCategories as $intent => $keywords) {
        $score = count(array_intersect($userWords, $keywords));
        $intentScores[$intent] = $score;
    }

    // Determine the intent with the highest score
    $maxScore = max($intentScores);
    $intent = array_search($maxScore, $intentScores);
    
    return $intent;
}

// Function to break the parahraph into sentences
function breakSentences($text) {
    $text = strtolower($text);
    $sentences = preg_split('/(?<=[.!?])\s+/', $text, -1, PREG_SPLIT_NO_EMPTY);

    foreach ($sentences as &$sentence) {
        $sentence = trim(preg_replace('/\s+/', ' ', $sentence));
    }
    return $sentences;
}

//function delete process cookies
function deleteCookie($cookie){
    $cookie_name = $cookie;
    $expiration_time = time() - 3600;
    setcookie($cookie_name, "", $expiration_time, "/");
}

//function to analyze user emotions
function emotionAnalysis($userMessage, $conn){  
    
    $query = "SELECT words,recommendation FROM emotions_tbl";
    $result = mysqli_query($conn, $query);
    if (!$result) {
        die("Database query failed: " . mysqli_error($conn));
    }

    $recommendations = [];
    $emotionWeight = [];
    $counter = 0;
    // Loop through the database data
    while ($row = mysqli_fetch_assoc($result)) { 
    
        $userWords = preprocessAndTokenize($userMessage);
        $dbWords = preprocessAndTokenize($row['words']);
        $commonWordsCount = count(array_intersect($userWords, $dbWords));
        $totalWordsCount = count($dbWords);

        if($commonWordsCount > 0){ 
            $emotionWeight[$counter] = $commonWordsCount/$totalWordsCount;
            $recommendations[$counter] = $row['recommendation'];
        }
        $counter++;
    }

    $maxValueKey = array_search(max($emotionWeight), $emotionWeight);
    $matchedRecommendation = $recommendations[$maxValueKey];

    if($matchedRecommendation == null) {
        echo json_encode("Sorry I couldn't understand. can you try it again with different words?");
    }
    else {
        echo json_encode($matchedRecommendation . ' Do you want to predict your disorder?');
        setcookie('process-step', 'need_guidence_s1', time() + 3600, '/');
    }
    mysqli_close($conn);
    
}

//function to predict the disorder
function predictDisorder($userMessage, $conn){    
    
    $query = "SELECT symptoms,disorder_name FROM disorder_tbl";
    $result = mysqli_query($conn, $query);
    if (!$result) {
        die("Database query failed: " . mysqli_error($conn));
    }

    // Loop through the database data
    while ($row = mysqli_fetch_assoc($result)) {
    
        $symptom = breakSentences($row['symptoms']);
        $sentenceCount = count($symptom);
        $havingSymtom = 0;

        foreach ($symptom as $symptom) {

            $userWords = preprocessAndTokenize($userMessage);
            $dbWords = preprocessAndTokenize($symptom);
            $commonWordsCount = count(array_intersect($userWords, $dbWords));
            $totalWordsCount = count($dbWords);

            if(($commonWordsCount / $totalWordsCount) >= 0.5){
                $havingSymtom++;
            }
        }
        if(($havingSymtom / $sentenceCount) >= 0.5){
            $matchedDisorder = $row['disorder_name'];
        }
    }

    if(empty($matchedDisorder)){
        echo json_encode("Sorry I couldn't understand. can you try it again with different words?");
    }
    else{
        echo json_encode("As these symtoms you likely have ". $matchedDisorder . " Do you need any recommendations?");
        setcookie('process-step', 'need_guidence_s3', time() + 3600, '/');
        setcookie('disorder', $matchedDisorder, time() + 3600, '/');
    }
    mysqli_close($conn);
}

//function to give some recommendations
function suggestRecommendation($disorder, $conn){ 

    $query = "SELECT recommendations,disorder_name FROM disorder_tbl WHERE disorder_name = '$disorder'";
    $result = mysqli_query($conn, $query);
    if (!$result) {
        die("Database query failed: " . mysqli_error($conn));
    }

    $recommendations = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $recommendations = $row['recommendations'];
    }

    if(empty($recommendations)){
        echo json_encode("Sorry I couldn't understand. can you try it again with different words?");
    }
    else{
        echo json_encode($recommendations);
        deleteCookie('process');
        deleteCookie('process-step');
    }
    mysqli_close($conn);
}

//function to technical support
function technicalSupport($keyword, $col, $conn) {     
    setcookie('funct', $keyword, time() + 3600, '/');

    $query = "SELECT $col FROM brainstorminfo_tbl WHERE funct = '$keyword'";
    $result = mysqli_query($conn, $query);
    if (!$result) {
        die("Database query failed: " . mysqli_error($conn));
    }

    $response = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $response = breakSentences($row[$col]);
    }

    if(empty($response)){
        echo json_encode("Sorry I couldn't understand. can you try it again with different words?");
    }
    else if($col == 'about'){
        $response[] = "\nDo you want to know how to try this out?";
        echo json_encode($response);
        setcookie('process-step', 'technical-s2', time() + 3600, '/');
    }
    else{
        echo json_encode($response);
        deleteCookie('process');
        deleteCookie('process-step');
        deleteCookie('funct');
    }
    mysqli_close($conn);
}

// -----------------------------Main data handler-----------------------------------
$userMessage = $_POST['userMsg'];   

if($userMessage == 'delete'){
    deleteCookie('process'); 
    deleteCookie('process-step');  
}

if(!isset($_COOKIE['process'])){   

    $userIntent = classifyIntent($userMessage);

    switch($userIntent) {

        case "welcome":
            echo json_encode("Hello, How can i assist you?");
            break;

        case "greetings":
            echo json_encode($userMessage.', How can i assist you?');
            break;

        case "about":
            echo json_encode('I am Brainstorm AI bot who can assist you to find solutions for your mental problems.');
            break;

        case "capabilities":
            echo json_encode('I can help you to find the best solution for your problems and I also can give you some recommendations and information what you ask me about.');
            break;

        case "need_guidence":
            echo json_encode("Its a normal state of human mind that you can't decide exactly what should you do. So let me know what are you feel right now?");
            $process = 'need_guidence';
            setcookie('process', $process, time() + 3600, '/');
            break;

        case "negative_emotions":
            $process = 'need_guidence';
            setcookie('process', $process, time() + 3600, '/');
            emotionAnalysis($userMessage, $conn);
            break;

        case "search_disorders":
            $process = 'need_guidence';
            setcookie('process', $process, time() + 3600, '/');
            predictDisorder($userMessage, $conn);
            break;

        case 'get_medical_advice':
            echo json_encode("I can't give you that what you should exactly do. But I can give you some basic recommendations. So let me know what are you feel right now?");
            $process = 'need_guidence';
            setcookie('process', $process, time() + 3600, '/');
            break;

        case 'find_treatment':
            echo json_encode("I can't give you a spesific treatment. But you can start a treatment plan in our platform. Do you want to know further more about the treatment plan?");
            $process = 'treatment';
            setcookie('process', $process, time() + 3600, '/');
            break;

        case 'technical_support':
            echo json_encode("Tell me what you exactly want to do or what you want to know about?");
            $process = 'technical';
            setcookie('process', $process, time() + 3600, '/');
            break;

        case 'Check mental state':
        case 'Annual checkup':
        case 'Chat with your doctor':
        case 'Next therapy':
        case 'Daily activities':
        case 'Bargraph':
        case 'Add event':
        case 'Delete event':
        case 'Search event':
        case 'Update event':
        case 'User details':
        case 'Chat':
        case 'Test':
        case 'Progress':
        case 'Report':

            $techWords = preprocessAndTokenize($userMessage);

                if(in_array('know', $techWords)){
                    $col = 'about';
                    $keyword = classifyIntent($userMessage);
                    technicalSupport($keyword, $col, $conn);
                    $process = 'technical';
                    setcookie('process', $process, time() + 3600, '/');
                }
                else{
                    $col = 'steps';
                    $keyword = classifyIntent($userMessage);
                    technicalSupport($keyword, $col, $conn);
                }
            break;

    }
}

else{  
    
    switch($_COOKIE['process'] ?? ''){

        case 'need_guidence':
            if(empty($_COOKIE['process-step'])){ 
                $process = 'need_guidence_s0';
                setcookie('process-step', $process, time() + 3600, '/');
            }
        
            switch($_COOKIE['process-step'] ?? ''){
        
                case 'need_guidence_s0':  
                    emotionAnalysis($userMessage, $conn);
                    break;
        
                case 'need_guidence_s1':   
                    if(classifyIntent($userMessage) == 'yes'){ 
                        echo json_encode("Good then, Please can you tell me what are the regular symtoms that you have?");
                        setcookie('process-step', 'need_guidence_s2', time() + 3600, '/');
                    }
                    elseif(classifyIntent($userMessage) == 'no'){ 
                        echo json_encode("So how can I assist you towards?");
                        deleteCookie('process');
                        deleteCookie('process-step');
                    }
                    break;
        
                case 'need_guidence_s2':
                    predictDisorder($userMessage, $conn);
                    break;
        
                case 'need_guidence_s3':
                    if(classifyIntent($userMessage) == 'yes'){ 
                        suggestRecommendation($_COOKIE['disorder'], $conn);
                    }
                    elseif(classifyIntent($userMessage) == 'no'){ 
                        echo json_encode("So how can i assist you towards?");
                        deleteCookie('process');
                        deleteCookie('process-step');
                    }
                    break;
            }
            break;

        case 'treatment':
            if(empty($_COOKIE['process-step'])){    
                $process = 'treatment-s1';
                setcookie('process-step', $process, time() + 3600, '/');
            }
            
            switch($_COOKIE['process-step'] ?? ''){  
        
                case 'treatment-s1':   
                    if(classifyIntent($userMessage) == 'yes'){    
                        $col = 'about';
                        $keyword = 'Treatment plan';
                        technicalSupport($keyword, $col, $conn);
                        setcookie('process', 'technical', time() + 3600, '/');
                    }
                    elseif(classifyIntent($userMessage) == 'no'){ 
                        echo json_encode("So do you have a treatment plan?");
                        setcookie('process-step', 'treatment-s2', time() + 3600, '/');
                    }
                    break;
        
                case 'treatment-s2':
                    if(classifyIntent($userMessage) == 'yes'){   
                        echo json_encode("So do you want to see your progress?");
                        setcookie('process-step', 'treatment-s3', time() + 3600, '/');
                    }
                    elseif(classifyIntent($userMessage) == 'no'){ 
                        echo json_encode("So do you want to know how to create a treatment plan?");
                        setcookie('process-step', 'treatment-s4', time() + 3600, '/');
                    }
                    break;
        
                case 'treatment-s3':
                    if(classifyIntent($userMessage) == 'yes'){   
                        $col = 'steps';
                        $keyword = 'Progress';
                        technicalSupport($keyword, $col, $conn);
                    }
                    elseif(classifyIntent($userMessage) == 'no'){ 
                        echo json_encode("So how can I assist you towards?");
                        deleteCookie('process');
                        deleteCookie('process-step');
                    }
                    break;

                case 'treatment-s4':
                    if(classifyIntent($userMessage) == 'yes'){   
                        $col = 'steps';
                        $keyword = 'Treatment plan';
                        technicalSupport($keyword, $col, $conn);
                    }
                    elseif(classifyIntent($userMessage) == 'no'){ 
                        echo json_encode("So how can I assist you towards?");
                        deleteCookie('process');
                        deleteCookie('process-step');
                    }
                    break;
            }
            break;

        case 'technical':
            if(empty($_COOKIE['process-step'])){  echo json_encode("tech");
                $process = 'technical-s1';
                setcookie('process-step', $process, time() + 3600, '/');
            }
    
            switch($_COOKIE['process-step'] ?? ''){ 
        
                case 'technical-s1':  
                    $techWords = preprocessAndTokenize($userMessage);
                    $keyword = classifyIntent($userMessage);
    
                    if(in_array('know', $techWords) || in_array('about', $techWords)){
                        $col = 'about';
                        technicalSupport($keyword, $col, $conn);
                    }
                    else{
                        $col = 'steps';
                        technicalSupport($keyword, $col, $conn);
                    }
                    break;
    
                case 'technical-s2': 
                    if(classifyIntent($userMessage) == 'yes'){   
                        $col = 'steps';
                        $keyword = $_COOKIE['funct'];
                        technicalSupport($keyword, $col, $conn);
                    }
                    elseif(classifyIntent($userMessage) == 'no'){ 
                        echo json_encode("So how can I assist you towards?");
                        deleteCookie('process');
                        deleteCookie('process-step');
                        deleteCookie('funct');
                    }
                    break;
            }
            break;
    }

}

?>

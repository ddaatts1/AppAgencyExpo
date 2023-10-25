export enum EnumIconCustom {
    AntDesign,
    Entypo,
    EvilIcons,
    Feather,
    FontAwesome,
    FontAwesome5,
    Fontisto,
    Foundation,
    Ionicons,
}

export enum EnumHistory {
    Complete,
    Canceled,
    Waiting,
}

export enum EnumOderBottom {
    Order_handle,
    Order_processing,
    Order_cancel,
    Order_complete,
}

export enum EnumOder {
    FutureLang,//FTL 
    FKids,//KIDS
}

export enum Enum {
    Online,
    Offline,
}

export enum EnumCourse {
    Made, //đã thực hiện
    Processing, // đang thực hiện
    Unfulfilled, // chưa thực hiện
}

export enum EnumONOFF {
    NUll,
    ON, //online
    OFF, // off online
}

export enum EnumLearning {
    Submit, //nộp bài
    NotSubmitted, // chưa nộp bài
}

export enum EnumNavigatorTraining {
    TrainingSchedule,
    TrainingDetail,
    StartLearning,
    LearningDetail,
    FutureAcademy,
    Question,
    DocumentDetail,
    MyCourses,
    QuestionResult,
    TrainingScheduleDetail,
}

export enum EnumRank {
    Best,
    Second,
    Father,
    FourthPrize,
    FifthPrize,
    SixthPrize,
}

export enum EnumStatusTraining {
    StatusNull,
    Video,
    Question,
    Rights,
}

export enum EnumQuestionStatus {
    PastIndex, //tương lai
    PresentIndex, //hiện tại
    FutureIndex, //quá khứ
}

export enum EnumQuestionStatusResult {
    Correct, //kết quả đúng
    CorrectFocus, //kết quả đúng focus
    Wrong, //kết quả sai
    WrongFocus, //kết quả sai focus
    NoAnswer, //không trả lời kết quả
    NoAnswerFocus, //không trả lời kết quả focus
}

export enum EnumKYC {
    initialStatus, // trạng thái ban đầu
    standbyStatus, //Trạng thái chờ duyệt
    incompleteStatus, //Chưa cập nhật xong thông tin
    completedStatus, //hoàn thành đã duyệt
}

export enum ProductType {
    Card = 1, // san pham fshop
    Fshop = 2 // cac loai the
}

export enum EnumLearnCard {
    All,
    English,
    Chinese,
    Japanese,
    Korean,
}

const participantUp = (participantUp: any) => {
    let data = participantUp.toLowerCase();
    switch (data) {
        case 'new':
            return 'Khách mời';
        case 'collaborator':
            return 'CTV';
        case 'agency1':
            return 'Đại sứ Lãnh đạo';
        case 'agency2':
            return 'Đại sứ Thịnh vượng';
        case 'agency3':
            return 'Đại sứ Gieo hạt';
        case 'agency4':
            return 'Đại sứ Tiên phong';
        case 'mainagency':
            return 'Tổng đại sứ';
        case 'foundercircle':
            return 'FounderCircle';
        case 'fc':
            return 'FounderCircle';
        case 'foundercircleup':
            return 'FC trở lên';
        case 'vfc':
            return 'VFC';
        case 'mainagencyup':
            return 'Tổng đại sứ trở lên';
        case 'agency1up':
            return 'Đại sứ Lãnh đạo trở lên';
        case 'agency2up':
            return 'Đại sứ Thịnh vượng trở lên';
        case 'agency3up':
            return 'Đại sứ Gieo hạt trở lên';
        case 'agency4up':
            return 'Đại sứ Tiên phong trở lên';
        case 'collaboratorup':
            return 'CTV trở lên';
        case 'newup':
            return 'Khách mời trở lên';
        case 'newandagencyup':
            return 'Khách mời và tất cả đại sứ';
        case 'newandallagency':
            return 'Khách mời và tất cả đại sứ';
        case 'all':
            return 'Tất cả';
        case 'allagency':
            return 'Tất cả đại sứ';
        default:
            return 'Chưa định nghĩa';
    }
};

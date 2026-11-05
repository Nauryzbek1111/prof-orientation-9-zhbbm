export type UserRole = "admin" | "student" | "class_teacher" | "psychologist";

export const roleLabels: Record<UserRole, string> = {
  admin: "Әкімші",
  student: "Оқушы",
  class_teacher: "Сынып жетекшісі",
  psychologist: "Педагог-психолог"
};

export const rolePermissions: Record<UserRole, string[]> = {
  admin: ["Оқушыларды басқару", "Сыныптарды басқару", "Тесттерді басқару", "Нәтижелерді қарау", "Есептерді жүктеу"],
  student: ["Кәсіби бағдар тестін тапсыру", "Жеке нәтижені көру", "Мамандық ұсыныстарын көру"],
  class_teacher: ["Өз сыныбының оқушыларын көру", "Сынып нәтижелерін бақылау", "Сынып есебін қарау"],
  psychologist: ["Тесттерді жүргізу", "Нәтижелерді талдау", "Жеке кеңес беру белгісін қою", "Ұсыныстарды қарау"]
};

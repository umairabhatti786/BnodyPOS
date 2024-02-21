import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  I18nManager,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { Picker } from "@react-native-picker/picker";

import { reach } from "yup";
import AppColor from "../constant/AppColor";
import sizeHelper from "../helpers/sizeHelper";
import { CheckBoxCustom } from "./CheckBoxCustom";
import CustomButton from "./CustomButton";
import CustomDropDown from "./CustomDropDown";
import { CustomMenu } from "./CustomMenu";

const PrivacyPolicy = ({
  displayAlert,
  isPromptAlert,
  terminalCode,
  StringsList,
  onAcceptPrivacy,
  onPressCancel,
}) => {
  return (
    <Modal visible={displayAlert} transparent={true} animationType={"fade"}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
        }}
      >
        <View
          style={{
            width: "90%",
            backgroundColor: AppColor.white,
            paddingVertical: sizeHelper.calHp(20),
            // justifyContent: 'center',
            // alignItems: 'center',
            borderBottomLeftRadius: sizeHelper.calHp(10),
            borderBottomRightRadius: sizeHelper.calHp(10),
            paddingHorizontal: sizeHelper.calWp(20),
            zIndex: 99999,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: sizeHelper.calHp(800),
            }}
          >
            <Text
              style={{
                fontSize: sizeHelper.calHp(40),
                color: AppColor.black,
                marginVertical: sizeHelper.calHp(18),
                fontFamily: "Proxima Nova Bold",
              }}
            >
              {I18nManager.isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
            </Text>
            {I18nManager.isRTL ? (
              <Text
                style={{
                  fontSize: sizeHelper.calHp(40),
                  color: AppColor.black,
                  marginTop: sizeHelper.calHp(18),
                  fontFamily: "ProximaNova-Regular",
                }}
              >
                تاريخ السريان: 2022-05-02
                {"\n"}1 المقدمة
                {"\n"} مرحبا بكم في تطبيق بنود Bnody Restaurant POS.
                {"\n"} تطبيق بنودي Bnody POS Restaurant(يشار إليها فيما بعد باسم
                "الخدمة").
                {"\n"}تحكم سياسة الخصوصية الخاصة بنا زيارتك لموقع Bnody.com ،
                وتشرح كيف نقوم بجمع وحماية والكشف عن المعلومات التي تنتج عن
                استخدامك لخدماتنا.
                {"\n"} نستخدم بياناتك لتقديم الخدمة وتحسينها. باستخدام الخدمة ،
                فإنك توافق على جمع واستخدام المعلومات وفقًا لهذه السياسة. ما لم
                يتم تحديد خلاف ذلك في سياسة الخصوصية هذه ، فإن المصطلحات
                المستخدمة في سياسة الخصوصية هذه لها نفس المعاني كما في الشروط
                والأحكام الخاصة بنا.
                {"\n"} تحكم شروطها وأحكامها ("الشروط") جميع استخدامات خدمتنا
                وتشكل جنبًا إلى جنب مع سياسة الخصوصية اتفاقك معنا ("الاتفاقية").
                {"\n"} 2. التعاريف
                {"\n"}الخدماتيقصد به موقع Bnody.com الذي يديره تطبيق Bnody .
                {"\n"} بيانات شخصية تعني بيانات عن فرد على قيد الحياة يمكن تحديد
                هويته من تلك البيانات (أو من تلك المعلومات وغيرها سواء في حوزتنا
                أو من المحتمل أن تكون في حوزتنا).
                {"\n"} بيانات الاستخدام هي البيانات التي يتم جمعها تلقائيًا إما
                عن طريق استخدام الخدمة أو من البنية التحتية للخدمة نفسها (على
                سبيل المثال ، مدة زيارة الصفحة).
                {"\n"} الكوكيز هي ملفات صغيرة مخزنة على جهازك (الكمبيوتر أو
                الجهاز المحمول).
                {"\n"}متحكم بيانات تعني شخصًا طبيعيًا أو اعتباريًا (إما بمفرده
                أو بشكل مشترك أو بالاشتراك مع أشخاص آخرين) يحدد الأغراض التي من
                أجلها والطريقة التي تتم بها معالجة أي بيانات شخصية أو يتعين
                معالجتها لغرض سياسة الخصوصية هذه ، نحن نراقب البيانات لبياناتك.
                {"\n"}معالجات البيانات (أو مقدمو الخدمة)يُقصد بها أي شخص طبيعي
                أو اعتباري يقوم بمعالجة البيانات نيابة عن وحدة التحكم في
                البيانات قد نستخدم خدمات مختلفة لمقدمي الخدمة من أجل معالجة
                بياناتك بشكل أكثر فعالية.
                {"\n"}موضوع البيانات هو أي فرد على قيد الحياة موضوع ,للبيانات
                الشخصية,
                {"\n"}المستخدم هو الفرد الذي يستخدم خدمتنا. يتوافق المستخدم مع
                موضوع البيانات ، وهو موضوع البيانات الشخصية.
                {"\n"}3. جمع المعلومات واستخدامها
                {"\n"}نقوم بجمع عدة أنواع مختلفة من المعلومات لأغراض مختلفة
                لتوفير وتحسين خدماتنا لك.
                {"\n"} 4. أنواع البيانات المجمعة
                {"\n"} بيانات شخصية
                {"\n"} أثناء استخدام خدمتنا ، قد نطلب منك تزويدنا ببعض معلومات
                التعريف الشخصية التي يمكن استخدامها للاتصال أو التعرف عليك
                ("البيانات الشخصية"). قد تتضمن معلومات التعريف الشخصية ، على
                سبيل المثال لا الحصر:
                {"\n"} 0.1. عنوان بريد إلكتروني
                {"\n"} 0.2 الاسم الأول واسم العائلة
                {"\n"} 0.3 رقم الهاتف
                {"\n"} 0.4 العنوان ، البلد ، الولاية ، المقاطعة ، الرمز البريدي
                / الرمز البريدي ، المدينة
                {"\n"} 0.5 ملفات تعريف الارتباط وبيانات الاستخدام
                {"\n"} قد نستخدم بياناتك الشخصية للاتصال بك من خلال النشرات
                الإخبارية والمواد التسويقية أو الترويجية وغيرها من المعلومات
                التي قد تهمك. يمكنك إلغاء الاشتراك في تلقي أي من هذه الاتصالات
                أو جميعها منا باتباع رابط إلغاء الاشتراك.
                {"\n"} بيانات الاستخدام
                {"\n"}قد نقوم أيضًا بجمع المعلومات التي يرسلها متصفحك عندما تزور
                خدمتنا أو عندما تصل إلى الخدمة عن طريق أو من خلال أي جهاز
                ("بيانات الاستخدام").
                {"\n"} قد تتضمن بيانات الاستخدام هذه معلومات مثل عنوان بروتوكول
                الإنترنت لجهاز الكمبيوتر الخاص بك (مثل عنوان IP) ، ونوع المتصفح
                ، وإصدار المتصفح ، وصفحات الخدمة التي تزورها ، ووقت وتاريخ
                زيارتك ، والوقت الذي تقضيه على تلك الصفحات ، معرّفات الجهاز
                الفريدة وبيانات التشخيص الأخرى.
                {"\n"}عند الوصول إلى الخدمة باستخدام جهاز ، قد تتضمن بيانات
                الاستخدام هذه معلومات مثل نوع الجهاز الذي تستخدمه ، و المعرف
                الفريد لجهازك ، وعنوان IP الخاص بجهازك ، ونظام تشغيل جهازك ،
                ونوع متصفح الإنترنت الذي تستخدمه ، معرّفات الجهاز الفريدة
                وبيانات التشخيص الأخرى.
                {"\n"} بيانات الموقع
                {"\n"} قد نستخدم معلومات عن موقعك وخزنها إذا سمحت لنا بذلك
                ("بيانات الموقع"). نستخدم هذه البيانات لتوفير ميزات خدمتنا ،
                لتحسين وتخصيص خدمتنا.
                {"\n"} يمكنك تمكين أو تعطيل خدمات الموقع عند استخدام خدماتنا في
                أي وقت عن طريق إعدادات جهازك.
                {"\n"} تتبع بيانات ملفات تعريف الارتباط
                {"\n"} نحن نستخدم ملفات تعريف الارتباط وتقنيات التتبع المماثلة
                لتتبع النشاط على خدمتنا ونحتفظ بمعلومات معينة.
                {"\n"} ملفات تعريف الارتباط هي ملفات تحتوي على كمية صغيرة من
                البيانات التي قد تتضمن معرفًا فريدًا مجهول الهوية. يتم إرسال
                ملفات تعريف الارتباط إلى متصفحك من موقع ويب وتخزينها على جهازك.
                تُستخدم تقنيات التتبع الأخرى أيضًا مثل الإشارات والعلامات
                والنصوص لجمع المعلومات وتتبعها و تحسين خدمتنا وتحليلها.
                {"\n"} يمكنك توجيه متصفحك لرفض جميع ملفات تعريف الارتباط أو
                للإشارة إلى وقت إرسال ملف تعريف الارتباط. ومع ذلك ، إذا كنت لا
                تقبل ملفات تعريف الارتباط ، فقد لا تتمكن من استخدام بعض أجزاء من
                خدمتنا.
                {"\n"} أمثلة على ملفات تعريف الارتباط التي نستخدمها:
                {"\n"} 0.1. ملفات تعريف ارتباط الجلسة: نستخدم ملفات تعريف ارتباط
                الجلسة لتشغيل خدمتنا.
                {"\n"} 0.2 ملفات تعريف الارتباط المفضلة: نستخدم ملفات تعريف
                الارتباط المفضلة لتذكر تفضيلاتك والإعدادات المختلفة.
                {"\n"} 0.3 ملفات تعريف الارتباط الأمنية: نستخدم ملفات تعريف
                الارتباط الأمنية لأغراض أمنية.
                {"\n"} 0.4 ملفات تعريف الارتباط الإعلانية: تُستخدم ملفات تعريف
                الارتباط الإعلانية لخدمتك مع الإعلانات التي قد تكون ذات صلة بك
                واهتماماتك.
                {"\n"} بيانات أخرى
                {"\n"} أثناء استخدام خدمتنا ، قد نقوم أيضًا بجمع المعلومات
                التالية: الجنس ، والعمر ، وتاريخ الميلاد ، ومكان الميلاد ،
                وتفاصيل جواز السفر ، والجنسية ، والتسجيل في مكان الإقامة
                والعنوان الفعلي ، ورقم الهاتف (العمل ، والجوال) ، تفاصيل
                المستندات في التعليم والتأهيل والتدريب المهني واتفاقيات العمل
                ،اتفاقيات NDA، معلومات عن المكافآت والتعويضات ، معلومات عن
                الحالة الاجتماعية ، أفراد الأسرة ، رقم الضمان الاجتماعي (أو رقم
                تعريف دافع الضرائب الآخر) ، أو موقع المكتب وبيانات أخرى.
                {"\n"} 5. استخدام البيانات
                {"\n"} يستخدم تطبيق Bnody POS Restaurant البيانات التي تم جمعها
                لأغراض مختلفة:
                {"\n"} 0.1. لتقديم خدماتنا والحفاظ عليها
                {"\n"} 0.2 لإعلامك عن تغييرات لخدمتنا
                {"\n"} 0.3 السماح لك بالمشاركة في الميزات التفاعلية لخدمتنا
                عندما تختار القيام بذلك
                {"\n"} 0.4 لتقديم دعم العملاء
                {"\n"} 0.5 لجمع التحليل أو المعلومات القيمة حتى نتمكن من تحسين
                خدماتنا
                {"\n"} 0.6 لمراقبة استخدام خدمتنا
                {"\n"} 0.7. لاكتشاف ومنع ومعالجة القضايا الفنية
                {"\n"} 0.8 لتحقيق أي غرض آخر تقدمه من أجله
                {"\n"} 0.9 تنفيذ التزاماتنا وإنفاذ حقوقنا الناشئة عن أي عقود
                مبرمة بينك وبيننا ، بما في ذلك الفواتير والتحصيل
                {"\n"} 0.10. لتزويدك بإشعارات حول حسابك / أو اشتراكك ، بما في
                ذلك إشعارات انتهاء الصلاحية والتجديد وإرشادات البريد الإلكتروني
                وما إلى ذلك
                {"\n"} 0.11. لتزويدك بالاخبار والعروض الخاصة والمعلومات العامة
                حول السلع والخدمات والأحداث الأخرى التي نقدمها والتي تشبه تلك
                التي اشتريتها بالفعل أو استفسرت عنها ما لم تكن قد اخترت عدم تلقي
                هذه المعلومات
                {"\n"} 0.12. بأي طريقة أخرى قد نصفها عند تقديم المعلومات
                {"\n"} 0.13. لأي غرض آخر بموافقتك.
                {"\n"} 6. الاحتفاظ بالبيانات
                {"\n"} سنحتفظ ببياناتك الشخصية فقط طالما كان ذلك ضروريًا للأغراض
                المنصوص عليها في سياسة الخصوصية هذه ، يحتفظ ببياناتك الشخصية
                ونستخدمها بالقدر اللازم للامتثال بالتزاماتها القانونية (على سبيل
                المثال ، إذا كنا مطالبين الاحتفاظ ببياناتك للامتثال للقوانين
                المعمول بها) ، وحل النزاعات ، وفرض اتفاقيتنا سياساتنا القانونية.
                {"\n"} سنحتفظ أيضًا بالبيانات الاستخدام لأغراض التحليل الداخلي.
                يتم الاحتفاظ ببيانات الاستخدام عمومًا لفترة أقصر ، إلا في حالة
                استخدام هذه البيانات لتعزيز الأمن أو لتحسين وظائف خدمتنا ، أو
                نحن ملزمون قانونًا بالاحتفاظ بهذه البيانات لفترات زمنية أطول.
                {"\n"} 7. نقل البيانات قد يتم نقل معلوماتك ، بما في ذلك البيانات
                الشخصية ، إلى أجهزة الكمبيوتر الموجودة خارج ولايتك أو مقاطعتك أو
                بلدك أو الولاية القضائية الحكومية الأخرى التي قد تختلف فيها
                قوانين حماية البيانات عن تلك الموجودة في ولايتك القضائية. إذا
                كنت متواجدًا خارج المملكة العربية السعودية و اخترت تقديم معلومات
                لنا ، يرجى ملاحظة أننا نقوم بنقل البيانات ، بما في ذلك البيانات
                الشخصية ، إلى المملكة العربية السعودية ومعالجتها هناك. موافقتك
                على سياسة الخصوصية هذه متبوعة بتقديمك لهذه المعلومات تمثل
                موافقتك على هذا النقل. سيتخذ تطبيق Bnody POS Restaurant جميع
                الخطوات اللازمة بشكل معقول لضمان معالجة بياناتك بشكل آمن ووفقًا
                لسياسة الخصوصية هذه ولن يتم نقل بياناتك الشخصية إلى منظمة أو
                دولة ما لم تكن هناك ضوابط كافية مطبقة بما في ذلك أمن بياناتك
                وغيرها من المعلومات الشخصية.
                {"\n"} 8. الإفصاح عن البيانات قد نكشف عن المعلومات الشخصية التي
                نجمعها ، أو تقدم:
                {"\n"} 0.1. الإفصاح عن جهات إنفاذ القانون. في ظل ظروف معينة ، قد
                يُطلب منا الكشف عن بياناتك الشخصية إذا طُلب منا ذلك بموجب
                القانون أو استجابة لطلبات صحيحة من السلطات العامة.
                {"\n"} 0.2 المعاملات التجارية. إذا شاركنا نحن أو الشركات التابعة
                لنا في عملية دمج أو استحواذ أو بيع أصول ، فقد يتم نقل بياناتك
                الشخصية.
                {"\n"} 0.3 حالات اخرى. قد نكشف عن معلوماتك أيضًا:
                {"\n"} 0.3.1. إلى الشركات التابعة لنا والشركات التابعة لنا
                {"\n"} 0.3.2. للمقاولين ومقدمي الخدمات والأطراف الثالثة الأخرى
                التي نستخدمها لدعم أعمالنا
                {"\n"} 0.3.3. لتحقيق الغرض الذي تقدمه من أجله
                {"\n"} 0.3.4. لغرض تضمين شعار شركتك على موقعنا
                {"\n"} 0.3.5. لأي غرض آخر نكشف عنه عند تقديم المعلومات
                {"\n"} 0.3.6. بموافقتك في أي حالات أخرى
                {"\n"} 0.3.7. إذا كنا نعتقد أن الإفصاح ضروري أو مناسب لحماية
                حقوق أو ممتلكات أو سلامة الشركة أو عملائنا أو غيرهم.
                {"\n"} 9. أمن البيانات أمان بياناتك مهم بالنسبة لنا ولكن تذكر
                أنه لا توجد وسيلة نقل عبر الإنترنت أو طريقة تخزين إلكتروني آمنة
                بنسبة 100٪. بينما نسعى جاهدين لاستخدام وسائل مقبولة تجاريًا
                لحماية بياناتك الشخصية ، لا يمكننا ضمان أمنها المطلق.
                {"\n"} 10. حقوق حماية البيانات الخاصة بك بموجب اللائحة العامة
                لحماية البيانات (GDPR) إذا كنت مقيمًا في الاتحاد الأوروبي (EU)
                والمنطقة الاقتصادية الأوروبية (EEA) ، فلديك بعض حقوق حماية
                البيانات التي يغطيها القانون العام لحماية البيانات (GDPR). نهدف
                إلى اتخاذ خطوات معقولة للسماح لك بتصحيح أو تعديل أو حذف أو تقييد
                استخدام بياناتك الشخصية. إذا كنت ترغب في إبلاغك بالبيانات
                الشخصية التي نحتفظ بها عنك وإذا كنت تريد إزالتها من أنظمتنا ،
                فيرجى مراسلتنا عبر البريد الإلكتروني على info@bnody.com. في ظروف
                معينة ، تتمتع بحقوق حماية البيانات التالية:
                {"\n"} 0.1. الحق في الوصول إلى المعلومات التي لدينا عنك أو
                تحديثها أو حذفها
                {"\n"} 0.2 حق التصحيح ، لديك الحق في تصحيح معلوماتك إذا كانت هذه
                المعلومات غير دقيقة أو غير كاملة
                {"\n"} 0.3 الحق في الاعتراض، لديك الحق في الاعتراض على معالجتنا
                لبياناتك الشخصية
                {"\n"} 0.4 حق التقييد ، لديك الحق في طلب تقييد معالجة معلوماتك
                الشخصية
                {"\n"} 0.5 الحق في نقل البيانات ، لديك الحق في الحصول على نسخة
                من بياناتك الشخصية بتنسيق منظم وقابل للقراءة آليًا وشائع
                الاستخدام
                {"\n"} 0.6 الحق في سحب الموافقة ، لديك أيضًا الحق في سحب موافقتك
                في أي وقت حيث نعتمد على موافقتك لمعالجة معلوماتك الشخصية يرجى
                ملاحظة أننا قد نطلب منك التحقق من هويتك قبل الرد على هذه الطلبات
                ، ويرجى ملاحظة أننا قد لا نتمكن من تقديم الخدمة بدون بعض
                البيانات الضرورية. لديك الحق في تقديم شكوى إلى هيئة حماية
                البيانات بشأن جمعنا لبياناتك الشخصية واستخدامها ، لمزيد من
                المعلومات يرجى الاتصال بهيئة حماية البيانات المحلية في المنطقة
                الاقتصادية الأوروبية (EEA).
                {"\n"} 11. حقوق حماية البيانات الخاصة بك بموجب قانون حماية
                الخصوصية لولاية كاليفورنيا (CalOPPA) CalOPPA هو أول قانون ولاية
                في الدولة يطالب المواقع التجارية والخدمات عبر الإنترنت بنشر
                سياسة الخصوصية ، يمتد نطاق القانون إلى ما هو أبعد من ولاية
                كاليفورنيا ليطلب من شخص أو شركة في الولايات المتحدة (ويمكن تصوره
                للعالم) تشغيل مواقع الويب التي تجمع معلومات التعريف الشخصية من
                مستهلكي كاليفورنيا لنشر سياسة خصوصية واضحة على موقع الويب الخاص
                بها توضح بالضبط المعلومات التي يتم جمعها وتلك الأفراد الذين يتم
                مشاركتها معهم ، والامتثال لهذه السياسة. وفقًا لـ CalOPPA ، نوافق
                على ما يلي:
                {"\n"} 0.1. يمكن للمستخدمين زيارة موقعنا بشكل مجهول
                {"\n"} 0.2 يشتمل رابط سياسة الخصوصية الخاصة بنا على كلمة
                "الخصوصية" ، ويمكن العثور عليه بسهولة على الصفحة الرئيسية
                لموقعنا على الويب
                {"\n"} 0.3 سيتم إخطار المستخدمين بأي تغييرات في سياسة الخصوصية
                على صفحة سياسة الخصوصية الخاصة بنا
                {"\n"} 0.4 يمكن للمستخدمين تغيير معلوماتهم الشخصية عن طريق
                مراسلتنا عبر البريد الإلكتروني على info@bnody.com. سياستنا بشأن
                إشارات "عدم التعقب": نحن نحترم إشارات عدم التتبع ولا نتتبع ملفات
                تعريف الارتباط أو نزرعها أو نستخدم الإعلانات عندما تكون آلية
                متصفح عدم التعقب في مكانها الصحيح ،عدم التعقب هو تفضيل يمكنك
                تعيينه في متصفح الويب الخاص بك لإعلام مواقع الويب بأنك لا تريد
                أن يتم تعقبك. يمكنك تمكين أو تعطيل "عدم التعقب" من خلال زيارة
                صفحة "التفضيلات" أو "الإعدادات" في متصفح الويب الخاص بك.
                {"\n"} 12. حقوق حماية البيانات الخاصة بك بموجب قانون خصوصية
                المستهلك في كاليفورنيا (CCPA) إذا كنت مقيمًا في كاليفورنيا ،
                فيحق لك معرفة البيانات التي نجمعها عنك ، واطلب حذف بياناتك وعدم
                بيعها (مشاركتها). لممارسة حقوق حماية البيانات الخاصة بك ، يمكنك
                تقديم طلبات معينة و مطالبتنا بما يلي:
                {"\n"} 0.1. ما هي المعلومات الشخصية التي لدينا عنك. إذا قمت
                بتقديم هذا الطلب ، سنعود إليك:
                {"\n"} 0.0.1. فئات المعلومات الشخصية التي جمعناها عنك.
                {"\n"} 0.0.2. فئات المصادر التي تجمع منها معلوماتك الشخصية.
                {"\n"} 0.0.3. الغرض التجاري أو التجاري لجمع أو بيع معلوماتك
                الشخصية.
                {"\n"} 0.0.4. فئات الجهات الخارجية التي نشارك معها المعلومات
                الشخصية.
                {"\n"} 0.0.5. الأجزاء المحددة من المعلومات الشخصية التي جمعناها
                عنك.
                {"\n"} 0.0.6. قائمة بفئات المعلومات الشخصية التي قمنا ببيعها ،
                إلى جانب فئة أي شركة أخرى قمنا ببيعها لها. إذا لم نقم ببيع
                معلوماتك الشخصية ، فيس نبلغك بهذه الحقيقة.
                {"\n"} 0.0.7. قائمة بفئات المعلومات الشخصية التي كشفنا عنها لغرض
                تجاري ، جنبًا إلى جنب مع فئة أي شركة أخرى شاركنا بها معها. يرجى
                ملاحظة أنه يحق لك أن تطلب منا تزويدك بهذه المعلومات حتى مرتين في
                فترة اثني عشر شهرًا. عند تقديم هذا الطلب ، قد تقتصر المعلومات
                المقدمة على المعلومات الشخصية التي جمعناها عنك في الاثني عشر
                شهرًا الماضية.
                {"\n"} 0.2 حذف معلوماتك الشخصية. إذا قمت بتقديم هذا الطلب ،
                سنقوم بحذف المعلومات الشخصية التي نحتفظ بها عنك اعتبارًا من
                تاريخ طلبك من سجلاتنا وتوجيه أي من مزودي الخدمة لفعل الشيء نفسه.
                في بعض الحالات ، يمكن أن يتم الحذف من خلال إلغاء تعريف
                المعلومات. إذا اخترت حذف معلوماتك الشخصية ، فقد لا تتمكن من
                استخدام وظائف معينة تتطلب تشغيل معلوماتك الشخصية.
                {"\n"} 0.3 للتوقف عن بيع معلوماتك الشخصية. نحن لا نبيع أو نؤجر
                معلوماتك الشخصية لأي طرف ثالث لأي غرض من الأغراض. نحن لا نبيع
                معلوماتك الشخصية مقابل مادي. ومع ذلك ، في بعض الظروف ، يمكن
                اعتبار نقل المعلومات الشخصية إلى طرف ثالث ، أو داخل مجموعة
                شركاتنا ، دون مقابل نقدي ، بمثابة "بيع" بموجب قانون ولاية
                كاليفورنيا. أنت المالك الوحيد لبياناتك الشخصية ويمكنك طلب الكشف
                أو الحذف في أي وقت. إذا قمت بتقديم طلب لوقف بيع معلوماتك الشخصية
                ، فسوف نتوقف عن إجراء عمليات النقل هذه. يرجى ملاحظة أنه إذا طلبت
                منا حذف بياناتك أو التوقف عن بيعها ، فقد يؤثر ذلك على تجربتك
                معنا ، وقد لا تتمكن من المشاركة في بعض البرامج أو خدمات العضوية
                التي تتطلب استخدام معلوماتك الشخصية لتعمل. ولكن في أي ظرف من
                الظروف ، سوف نميز ضدك بسبب ممارستك لحقوقك. لممارسة حقوق حماية
                بيانات كاليفورنيا الموضحة أعلاه ، يرجى إرسال طلبك (طلباتك) عبر
                البريد الإلكتروني: info@bnody.com. حقوق حماية البيانات الخاصة بك
                ، الموضحة أعلاه ، مغطاة بقانون حماية خصوصية المستهلك في
                كاليفورنيا ، باختصار لقانون خصوصية المستهلك في كاليفورنيا.
                لمعرفة المزيد ، قم بزيارة الموقع الرسمي للمعلومات التشريعية
                لولاية كاليفورنيا. دخلت CCPA حيز التنفيذ في 01/01/2020.
                {"\n"} 13. مقدمو الخدمة يجوز لنا توظيف شركات وأفراد من أطراف
                ثالثة لتسهيل خدمتنا ("مزودي الخدمة") ، أو تقديم الخدمة نيابة عنا
                ، أو أداء الخدمات المتعلقة بالخدمة أو مساعدتنا في تحليل كيفية
                استخدام خدمتنا. هذه الأطراف الثالثة لديها حق الوصول إلى بياناتك
                الشخصية فقط لأداء هذه المهام نيابة عنا وهي ملزمة بعدم الكشف عنها
                أو استخدامها لأي غرض آخر.
                {"\n"} 14. التحليلات قد نستخدم مزودي خدمة تابعين لجهات خارجية
                لمراقبة وتحليل استخدام خدمتنا.
                {"\n"} 15. أدوات CI / CD قد نستخدم مزودي خدمة من جهات خارجية
                لأتمتة عملية تطوير خدماتنا.
                {"\n"} 16. تجديد النشاط التسويقي السلوكي قد نستخدم خدمات تجديد
                النشاط التسويقي للإعلان لك على مواقع الطرف الثالث بعد زيارتك
                لخدمتنا. نستخدم نحن الموردين الخارجيين ملفات تعريف الارتباط
                للإبلاغ عن الإعلانات وتحسينها وعرضها بناءً على زياراتك السابقة
                لخدمتنا.
                {"\n"} 17. المدفوعات قد نقدم منتجات و / أو خدمات مدفوعة ضمن
                الخدمة. في هذه الحالة ، نستخدم خدمات الجهات الخارجية لمعالجة
                الدفع (مثل معالجات الدفع). لن نقوم بتخزين أو جمع تفاصيل بطاقة
                الدفع الخاصة بك. يتم تقديم هذه المعلومات مباشرة إلى معالجة الدفع
                التابعين لجهات خارجية والذين يخضع استخدامك لمعلوماتك الشخصية
                لسياسة الخصوصية الخاصة بهم. تلتزم معالجات الدفع هذه بالمعايير
                التي حددتها PCI-DSS كما يديرها مجلس معايير أمان PCI ، وهو جهد
                مشترك لعلامات تجارية مثل Visa و Mastercard و American Express و
                Discover. تساعد متطلبات PCI-DSS على ضمان المعالجة الآمنة
                لمعلومات الدفع.
                {"\n"} 18. روابط لمواقع أخرى قد تحتوي خدمتنا على روابط لمواقع
                أخرى لا نقوم بتشغيلها. إذا قمت بالنقر فوق ارتباط جهة خارجية ،
                فسيتم توجيهك إلى موقع هذا الطرف الثالث. ننصحك بشدة بمراجعة سياسة
                الخصوصية لكل موقع تزوره. ليس لدينا أي سيطرة ولا نتحمل أي مسؤولية
                عن المحتوى أو سياسات الخصوصية أو الممارسات الخاصة بأي مواقع أو
                خدمات خاصة بطرف ثالث. على سبيل المثال ، المبينسياسة خاصةتم
                استخدامPolicyMaker.io، أداة مجانية تساعد في إنشاء مستندات
                قانونية عالية الجودة. صانع السياسة منشئ سياسة الخصوصية هي أداة
                سهلة الاستخدام لإنشاء ملف سياسة الخصوصية لمدونة أو موقع ويب أو
                متجر تجارة إلكترونية أو تطبيق جوال.
                {"\n"} 19. خصوصية الأطفال خدماتنا غير مخصصة للاستخدام من قبل
                الأطفال الذين تقل أعمارهم عن 18 عامًا ("الطفل" أو "الأطفال").
                نحن لا نجمع عن عمد معلومات تعريف شخصية من الأطفال دون سن 18
                عامًا. إذا علمت أن أحد الأطفال قد زودنا ببيانات شخصية ، فيرجى
                الاتصال بنا. إذا علمنا أننا جمعنا بيانات شخصية من الأطفال دون
                التحقق من موافقة الوالدين ، فإننا نتخذ خطوات لإزالة هذه
                المعلومات من خوادمنا.
                {"\n"} 20. التغييرات في سياسة الخصوصية هذه قد نقوم بتحديث سياسة
                الخصوصية الخاصة بنا من وقت لآخر. سنخطرك بأي تغييرات عن طريق نشر
                سياسة الخصوصية الجديدة على هذه الصفحة. سنخبرك عبر البريد
                الإلكتروني و / أو إشعارًا بارزًا على خدمتنا ، قبل أن يصبح
                التغيير ساريًا وتحديث "التاريخ الفعلي" في الجزء العلوي من سياسة
                الخصوصية هذه. يُنصح بمراجعة سياسة الخصوصية هذه بشكل دوري لمعرفة
                أي تغييرات. تسري التغييرات التي تطرأ على سياسة الخصوصية هذه عند
                نشرها على هذه الصفحة.
                {"\n"} 21. اتصل بنا إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه
                ، يرجى الاتصال بنا عبر البريد الإلكتروني: info@bnody.com.
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: sizeHelper.calHp(40),
                  color: AppColor.black,
                  marginTop: sizeHelper.calHp(18),
                  fontFamily: "ProximaNova-Regular",
                }}
              >
                Effective date 02-05-2022 {"\n"}
                Welcome to the Bnody Restaurant POS Terms application.{"\n"}
                Application of the Terms of Use (here in after referred to as
                the "Service")
                {"\n"}• Our Privacy Policy governs your visit to Bnody.com, and
                explains how we collect, protect and disclose information that
                results from your use of our Services.{"\n"}• We use your data
                to provide and improve the Service. By using the Service, you
                agree to the collection and use of information in accordance
                with this policy. Unless otherwise defined in this Privacy
                Policy, terms used in this Privacy Policy have the same meanings
                as in our Terms and Conditions.{"\n"}• Its terms and conditions
                ("Terms") govern all use of our Service and together with the
                Privacy Policy constitute your agreement with us ("Agreement").
                {"\n"}
                2. Definitions{"\n"}• Services means Bnody.com operated by Bnody
                POS Restaurant Application. {"\n"}• Personal Data means data
                about a living individual who can be identified from that data
                (or from such and other information either in our possession or
                likely to be in our possession). {"\n"}• Usage Data is data
                collected automatically either by use of the Service or from the
                Service infrastructure itself (for example, the duration of a
                page visit). {"\n"}• Cookies are small files stored on your
                device (computer or mobile device).
                {"\n"}• Data Controller means a natural or legal person (either
                alone or jointly with other legal persons) who determines the
                purposes for which and the manner in which any Personal Data is
                or is to be processed for the purpose of this Privacy Policy, we
                are the data controller for your data . {"\n"}• Data Processors
                (or Service Providers) means any legal person who processes data
                on behalf of a data controller. We may use different services of
                Service Providers in order to process your data more
                effectively. {"\n"}• A data subject is any living individual who
                is the subject of personal data, {"\n"}• User is the individual
                who uses our Service. The user corresponds to the data subject,
                who is the subject of personal data.{"\n"}
                3. Information Collection and Use We collect several different
                types of information for various purposes to provide and improve
                our Service to you. Types of collected data, While using our
                Service, we may ask you to provide us with certain personal
                identifiable information that can be used to contact or identify
                you ("Personal Data"). Personal identifiable information may
                include, but is not limited to:
                {"\n"}• An email address
                {"\n"}•First and last name
                {"\n"}•Phone number
                {"\n"}• Address, country, state, province, zip code, city.
                {"\n"}• Cookies and Usage Data
                {"\n"}We may use your personal data to contact you with
                newsletters, marketing or promotional materials and other
                information that may be of interest to you. You may opt out of
                receiving any or all of these communications from us by
                following the unsubscribe link.
                {"\n"}4. Data Usage:
                {"\n"}We may also collect information that your browser sends
                when you visit our Service or when you access the Service by or
                through any device ("Usage Data").
                {"\n"}This “Usage Data” may include information such as your
                computer's Internet Protocol address (e.g. IP address), browser
                type, browser version, the pages of our Service that you visit,
                the time and date of your visit, the time spent on those pages,
                device identifiers unique and other diagnostic data.
                {"\n"}When you access the Service using a device, this Usage
                Data may include information such as the type of device you use,
                your device unique identifier, the IP address of your device,
                your device operating system and the type of Internet browser
                you use, unique device identifiers and diagnostic data other.
                {"\n"}5. Location data:
                {"\n"}We may use and store information about your location if
                you allow us to do so ("Location Data").
                {"\n"} We use this data to provide features of our Service, to
                improve and customize our Service.
                {"\n"}You can enable or disable location services when using our
                services at any time via your device settings.
                {"\n"}6. Tracking cookie data:
                {"\n"}We use cookies and similar tracking technologies to track
                the activity on our Service and we hold certain information.
                {"\n"}Cookies are files with a small amount of data that may
                include an anonymous unique identifier.
                {"\n"}Cookies are sent to your browser from a website and stored
                on your device. Other tracking technologies such as beacons,
                tags, and scripts are also used to collect information.
                {"\n"}• To provide you with notices about your account and/or
                subscription, including expiration and renewal notices, email
                instructions, etc.
                {"\n"}• To provide you with news, special offers and general
                information about other goods, services and events offered by us
                that are similar to those you have already purchased or inquired
                about unless you have opted out of receiving such information.
                {"\n"}• In any other way we may describe when you provide the
                information.
                {"\n"}• For any other purpose with your consent.
                {"\n"}7. Data Retention:
                {"\n"}We will retain your Personal Data only for as long as
                necessary for the purposes set out in this Privacy Policy,
                retain and use your Personal Data to the extent necessary to
                comply with our legal obligations (for example, if we are
                required to retain your Data to comply with applicable laws),
                resolve disputes, Our agreement enforces our legal policies.
                {"\n"}We will also retain “Usage Data” for internal analysis
                purposes. “Usage Data” is generally retained for a shorter
                period, except when this data is used to strengthen the security
                or improve the functionality of our Service, or we are legally
                required to retain this data for longer periods of time.
                {"\n"}8. Data Transmission:
                {"\n"}Your information, including Personal Data, may be
                transferred to — and maintained on — computers located outside
                of your state, province, country or other governmental
                jurisdiction where the data protection laws may differ from
                those in your jurisdiction.
                {"\n"}If you are located outside Saudi Arabia and choose to
                provide information to us, please note that we transfer the
                data, including Personal Data, to Saudi Arabia and process it
                there.
                {"\n"}Your acceptance of this Privacy Policy followed by your
                submission of such information constitutes your consent to such
                transfer.
                {"\n"}Bnody POS Restaurant App will take all steps reasonably
                necessary to ensure that your data is treated securely and in
                accordance with this Privacy Policy and no transfer of your
                Personal Data will take place to an organization or a country
                unless there are adequate controls in place including the
                security of your data and other personal information.
                {"\n"} 9. Data Disclosure:
                {"\n"}We may disclose personal information that we collect, or
                provide:
                {"\n"}• Disclosure of law enforcement agencies.
                {"\n"}Under certain circumstances, we may be required to
                disclose your personal data if we are required to do so by law
                or in response to a valid requests from public authorities.
                {"\n"}• Business Transactions:
                {"\n"}If we or our affiliates are involved in a merger,
                acquisition, or sale of assets, your personal data may be
                transferred.
                {"\n"}We may also disclose your information:
                {"\n"}• To oursubsidiaries and affiliates.
                {"\n"}• To contractors, service. providers and other third
                parties we use to support our business
                {"\n"}• To achieve the purpose for which it is provided{"\n"}•
                For the purpose of including your company logo on our website.
                {"\n"}• For any other purpose that we disclose when providing
                the information with your consent in any other cases.
                {"\n"}If we believe disclosure is necessary or appropriate to
                protect the rights, property, or safety of the Company, our
                customers, or others.
                {"\n"}10. Data security:
                {"\n"}The security of your data is important to us but remember
                that no method of transmission over the Internet, or method of
                electronic storage is 100% secure. While we strive to use
                commercially acceptable means to protect your Personal Data, we
                cannot guarantee its absolute security.
                {"\n"}Your data protection rights under the General Data
                Protection Regulation (GDPR)
                {"\n"}If you are located in the European Union (EU) and European
                Economic Area (EEA), you have certain data protection rights
                covered by the General Data Protection Regulation (GDPR).
                {"\n"}We aim to take reasonable steps to allow you to correct,
                amend, delete or limit the use of your personal data.
                {"\n"}If you would like to be notified of what personal data we
                hold about you and if you would like it to be removed from our
                systems,{"\n"}please email us at info@bnody.com.
                {"\n"}In certain circumstances, you have the following data
                protection rights:
                {"\n"}• The right to access, update or delete the information we
                have about you.
                {"\n"}• Right to Correction You have the right to have your
                information corrected if this information is inaccurate or
                incomplete.
                {"\n"}• Right to object, you have the right to object to our
                processing of your personal data.
                {"\n"}• Right to Restriction, you have the right to request that
                the processing of your personal information be restricted.
                {"\n"}• Right to data portability, you have the right to obtain
                a copy of your personal data in a structured, machine-readable
                and commonly used format.
                {"\n"}11. Service Providers:
                {"\n"}We may employ third party companies and individuals to
                facilitate our Service (“Service Providers”), provide the
                Service on our behalf, perform Service-related services or
                assist us in analyzing how our Service is used.
                {"\n"}These third parties have access to your Personal Data only
                to perform these tasks on our behalf and are obligated not to
                disclose or use it for any other purpose.
                {"\n"}12. Analytics:
                {"\n"}We may use third-party Service Providers to monitor and
                analyze the use of our Service.
                {"\n"}13. CI/CD Tools:
                {"\n"}We may use third party Service Providers to automate the
                process of developing our Services.
                {"\n"}14. Behavioral Remarketing:
                {"\n"}We may use remarketing services to advertise to you on
                third party websites after you have visited our Service. We
                third party vendors use cookies to inform, optimize and serve
                ads based on your previous visits to our Service.{"\n"}
                15 Payments: {"\n"}
                We may offer paid products and/or services within the Service.
                In this case, we use third party services for payment processing
                (such as payment processors). {"\n"}
                We will not store or collect your payment card details. This
                information is provided directly to third party payment {"\n"}
                processors whose use of your personal information is governed by
                their privacy policy. These payment {"\n"}processors adhere to
                the standards set by PCI-DSS as managed by the PCI Security
                Standards Council, which {"\n"}is a joint effort of brands such
                as Visa, Mastercard, American Express, and Discover. PCI-DSS
                requirements {"\n"}help ensure the secure handling of payment
                information. {"\n"}
                16. Links to other websites: {"\n"}
                Our Service may contain links to other sites that are not
                operated by us. If you click on a third party link, you will be
                directed to that third party's site. We strongly advise you to
                review the privacy policy of every website you visit. {"\n"}
                We have no control over, and assume no responsibility for, the
                content, privacy policies, or practices of any third-party
                websites or services. {"\n"}
                For example, the one shown on Private Policy was
                usedPolicyMaker.io, a free tool that helps create high-quality
                legal documents. Policy Maker Privacy Policy Generator is an
                easy-to-use tool for creating a privacy policy file for a blog,
                website, e-commerce store, or mobile app.{"\n"}
                17. Children's privacy:{"\n"}
                Our Services are not intended for use by children under the age
                of 18 (“Child” or “Children”).{"\n"}We do not knowingly collect
                personally identifiable information from children under the age
                of 18. {"\n"}
                If you become aware that a child has provided us with personal
                data, please contact us. If we learn that we have {"\n"}
                collected personal data from children without verification of
                parental consent, we take steps to remove that information from
                our servers.{"\n"}
                18. Changes to this Privacy Policy: {"\n"}
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by {"\n"}posting the new Privacy
                Policy on this page.{"\n"}
                We will let you know via email and/or a prominent notice on our
                Service, prior to the change becoming effective and update the
                "effective date" at the top of this Privacy Policy. {"\n"}
                You are advised to review this Privacy Policy periodically for
                any changes. Changes to this Privacy Policy are effective when
                they are posted on this page.{"\n"}
                19. Contact us:{"\n"}
                If you have any questions about this Privacy Policy, please
                contact us by Email: info@bnody.com
              </Text>
            )}
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingVertical: sizeHelper.calHp(10),
            }}
          >
            <CustomButton
              containerStyle={{
                height: sizeHelper.calWp(50),
                width: sizeHelper.calWp(200),
                marginTop: sizeHelper.calHp(25),
              }}
              backgroundColor={AppColor.blue2}
              title={I18nManager.isRTL ? "قبول" : "Accept"}
              titleColor={AppColor.white}
              onPressButton={() => {
                onAcceptPrivacy();
              }}
            />
            {/* <CustomButton
              containerStyle={{
                height: sizeHelper.calWp(50),
                width: sizeHelper.calWp(200),
                marginTop: sizeHelper.calHp(25),
                marginStart: sizeHelper.calHp(25),
                backgroundColor: AppColor.red1,
              }}
              backgroundColor={AppColor.red1}
              title={I18nManager.isRTL ? "رفض" : "Reject"}
              titleColor={AppColor.white}
              onPressButton={() => onPressCancel()}
            /> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    StringsList: state.user.SaveAllData.StringsList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);

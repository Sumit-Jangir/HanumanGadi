"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    FiCheckCircle,
    FiPackage,
    FiPlus,
    FiMinus,
} from "react-icons/fi";
import { useLanguageStore } from "@/lib/stores/languageStore";

// Dummy API data
const DUMMY_PRODUCT = {
    "id": "26",
    "slug": "ram-raksha-yantra17745389943616",
    "product_name": "Ram Raksha Yantra",
    "sku": "Ram Yantra 1234",
    "price": "8100",
    "cod_advance_per": "50",
    "cod_advance_amt": "4050",
    "matrial": "Silver",
    "weight": "14",
    "size": "3.25*4.25",
    "quantity": "100000",
    "short_description": "<h2><i><strong>&nbsp;</strong></i><strong>Shri Ram Raksha Yantra of Ramlala:</strong><br><strong>The Symbol Of Overall Protection, Riches And Success</strong></h2><p>To attain peace, prosperity and protection from all kinds of evil forces and enemies, you can worship the Shri Ram Raksha Yantra of Ramlala. Believed to be an incarnation of Lord Vishnu, Lord Rama was also known as Maryada Purshottam. He was born to king Dashrath and defeated the Ravana, who was known for His evil powers. Thus, this Yantra is known to bless the worshipper by promoting victory over all enemies and evil forces. It is said that any person who dedicates himself to Lord Rama is bestowed with peace, happiness, contentment and satisfaction. This Yantra protects the worshipper from troubles, enemies, obstacles, diseases and dangers by working as a shield thus, paving a path to all-round prosperity, protection, luxuries, glorious success and fame. &nbsp;</p>",
    "description": "<p>A beautifully made 3.25x4.25 size with Shri Ram Raksha Yantra of Ramlala carved perfectly on it. This Yantra can be worn every day and it will keep you protected from all the evil forces. It has Lord Rama’s positive energies and the wearer should recite the provided mantra. It is made in pure silver with worship at aayodhya with mantra towards at front of hanumangadi temple so looks stunning and is equally powerful. The mystical geometric patterns have the energy to remove obstacles from your path. You can experience some amazing changes in life once you start wearing them.</p><p>This Yantra (Shri Ram Raksha Yantra of Ramlala), which is on the banks of river Saryu, the sacred land of Ayodhya Dham, the birthplace of Lord Shri Ram, will reach your home after being invited by the recitation of 1.25 lakh Ram Raksha Stotras, in which this proven yantra, after being resolved with your name and gotra, will reach your home. You will get it sitting, which you will be able to place at your home and business place, which will receive the blessings of the real Lord Shri Ram Lala and Hanumangadi Hanumanji Maharaj, which will be placed at your home and business place.</p><p>Shri Ram Raksha Yantra of Ramlala made in pure silver protects the user from negative energies. The diagrams of Yantras are engraved neatly after a deep research by our experts so you can get good results. It showers the blessings of Lord Rama and reciting the provided mantra enhances its positive effects. This Yantra brings prosperity and power while bestowing the user with wisdom. It should be worshipped regularly and it can be placed in your puja altar or at the entrance of your home.<br>Shri Ram Raksha Yantra of Ramlala: An Object Of Meditation</p><p>This Yantra can also be used for meditating over Lord Rama. This will help in making you mentally stable and more focused. It will also aid in attaining union with God through geometric visualization. This Yantra is the window through which you can align with the Divine energy. Through resonance, it connects you to the energy present in the macrocosm.<br>&nbsp;</p>",
    "extra_info": "<p>Yantra Worship Guidelines</p><p>&nbsp; &nbsp;First, purify your body and start with a clear and positive mind frame.<br>&nbsp; &nbsp;Find a place on the floor facing East where you will be undisturbed.<br>&nbsp; &nbsp;Light the incense or an oil lamp.<br>&nbsp; &nbsp;Lay a fresh flower and a fresh fruit on the altar.<br>&nbsp; &nbsp;Open the Yantra and place it along with the image of the deity of Yantra and your Ishta Devta (God).<br>&nbsp; &nbsp;Take the water with a leaf from any tree and sprinkle the water on yourself, followed by sprinkling the water on the Yantra.<br>&nbsp; &nbsp;Close your eyes and concentrate on the deity to bless you with wishes. Now with all sincerity, ask the Gods of nine planets for whatever you wish.</p><p><br>Shri Ram Raksha Yantra of Ramlala Guidelines</p><p>&nbsp; &nbsp;You may place it in East direction facing West or in your Puja altar in the East or wrap it in a &nbsp; &nbsp; red cloth and carry it along with you<br>&nbsp; &nbsp;You may keep it with or without a frame<br>&nbsp; &nbsp;Ritual worship is not compulsory and is up to you as per the spiritual discipline you follow<br>&nbsp; &nbsp;Many have seen its power by meditating on the tip of the Yantra<br>&nbsp; &nbsp;Worship it by gazing at it and saying your prayers<br>&nbsp; &nbsp;It works by manifesting your prayers through the power of the mantra embedded in it</p><p>Shri Ram Raksha Yantra of Ramlala Delivery Guidelines</p><p>&nbsp; &nbsp;Product Delivery will be done in 15 to 20 days from the completion of the puja invitation program.</p><p>Associations</p><p>&nbsp; &nbsp;Represents: Lord Rama<br>&nbsp; &nbsp;Purpose: To destroy all the evils and protect the person from all sorts of difficulties.<br>&nbsp; &nbsp;Mantra: RamRaksha Stotra.<br>&nbsp; &nbsp;</p>",
    "instruction": " Protects from all kind of difficulties and obstacles|  Attracts power and wisdom| Gives overall prosperity, fame and success",
    "hindi_short_description": "<h2><i><strong>रामलला का श्री राम रक्षा यंत्र:</strong></i><br><strong>समग्र सुरक्षा, धन और सफलता का प्रतीक</strong></h2><p>शांति, समृद्धि और सभी प्रकार की बुरी शक्तियों और शत्रुओं से सुरक्षा पाने के लिए आप रामलला के श्री राम रक्षा यंत्र की पूजा कर सकते हैं। भगवान विष्णु के अवतार माने जाने वाले भगवान राम को मर्यादा पुरुषोत्तम के नाम से भी जाना जाता है। उनका जन्म राजा दशरथ के घर हुआ था और उन्होंने रावण को हराया था, जो अपनी बुरी शक्तियों के लिए जाना जाता था। इस प्रकार, यह यंत्र सभी शत्रुओं और बुरी शक्तियों पर विजय को बढ़ावा देकर उपासक को आशीर्वाद देने के लिए जाना जाता है। ऐसा कहा जाता है कि जो कोई भी व्यक्ति खुद को भगवान राम को समर्पित करता है, उसे शांति, खुशी, संतोष और संतुष्टि मिलती है। यह यंत्र एक ढाल के रूप में काम करके उपासक को परेशानियों, शत्रुओं, बाधाओं, बीमारियों और खतरों से बचाता है, इस प्रकार, चौतरफा समृद्धि, सुरक्षा, विलासिता, शानदार सफलता और प्रसिद्धि का मार्ग प्रशस्त करता है।</p>",
    "hindi_description": "<p>3.25x4.25 साइज़ का एक सुंदर यंत्र जिस पर रामलला का श्री राम रक्षा यंत्र पूरी तरह से उकेरा गया है। इस यंत्र को हर दिन पहना जा सकता है और यह आपको सभी बुरी शक्तियों से सुरक्षित रखेगा। इसमें भगवान राम की सकारात्मक ऊर्जा है और इसे पहनने वाले को दिए गए मंत्र का जाप करना चाहिए। यह हनुमानगढ़ी मंदिर के सामने अयोध्या में पूजा के साथ शुद्ध चांदी से बना है, इसलिए यह देखने में बहुत खूबसूरत है और उतना ही शक्तिशाली भी है। रहस्यमय ज्यामितीय पैटर्न में आपके रास्ते से बाधाओं को दूर करने की ऊर्जा है। एक बार जब आप इसे पहनना शुरू करते हैं तो आप जीवन में कुछ आश्चर्यजनक बदलावों का अनुभव कर सकते हैं।</p><p>भगवान श्री राम की जन्मस्थली अयोध्या धाम की पावन भूमि सरयू नदी के तट पर विराजमान यह यंत्र (रामलला का श्री राम रक्षा यंत्र) सवा लाख राम रक्षा स्तोत्र के पाठ से अभिमंत्रित होकर आपके घर पहुंचेगा, जिसमें आपके नाम व गोत्र से संकल्पित होकर यह सिद्ध यंत्र आपके घर बैठे प्राप्त होगा, जिसे आप अपने घर व व्यवसाय स्थल पर स्थापित कर सकेंगे, जिसे साक्षात भगवान श्री राम लला व हनुमानगढ़ी हनुमानजी महाराज का आशीर्वाद प्राप्त होगा, जिसे आपके घर व व्यवसाय स्थल पर स्थापित किया जाएगा।</p><p>शुद्ध चांदी से बना रामलला का श्री राम रक्षा यंत्र उपयोगकर्ता को नकारात्मक ऊर्जाओं से बचाता है। हमारे विशेषज्ञों द्वारा गहन शोध के बाद यंत्रों के आरेखों को बड़े करीने से उकेरा गया है ताकि आप अच्छे परिणाम प्राप्त कर सकें। यह भगवान राम की कृपा बरसाता है और दिए गए मंत्र का जाप करने से इसके सकारात्मक प्रभाव बढ़ जाते हैं। यह यंत्र उपयोगकर्ता को बुद्धि प्रदान करते हुए समृद्धि और शक्ति लाता है। इसकी नियमित पूजा की जानी चाहिए और इसे आपकी पूजा वेदी या आपके घर के प्रवेश द्वार पर रखा जा सकता है।<br>रामलला का श्री राम रक्षा यंत्र: ध्यान की वस्तु</p><p>इस यंत्र का उपयोग भगवान राम का ध्यान करने के लिए भी किया जा सकता है। यह आपको मानसिक रूप से स्थिर और अधिक केंद्रित बनाने में मदद करेगा। यह ज्यामितीय दृश्य के माध्यम से ईश्वर के साथ एकता प्राप्त करने में भी सहायता करेगा। यह यंत्र वह खिड़की है जिसके माध्यम से आप दिव्य ऊर्जा के साथ जुड़ सकते हैं। अनुनाद के माध्यम से, यह आपको स्थूल जगत में मौजूद ऊर्जा से जोड़ता है।</p>",
    "hindi_extra_info": "<p><strong>यंत्र पूजा संबंधी दिशा-निर्देश</strong></p><p>सबसे पहले, अपने शरीर को शुद्ध करें और एक स्पष्ट और सकारात्मक मन के साथ शुरुआत करें।<br>पूर्व दिशा की ओर मुख करके फर्श पर एक जगह खोजें जहाँ आप शांत रहें।<br>धूप या तेल का दीपक जलाएँ।<br>वेदी पर एक ताज़ा फूल और एक ताज़ा फल रखें।<br>यंत्र खोलें और इसे यंत्र के देवता और अपने इष्ट देवता (भगवान) की छवि के साथ रखें।<br>किसी भी पेड़ के पत्ते के साथ जल लें और अपने ऊपर पानी छिड़कें, इसके बाद यंत्र पर पानी छिड़कें।<br>अपनी आँखें बंद करें और अपनी इच्छाओं को पूरा करने के लिए देवता पर ध्यान केंद्रित करें। अब पूरी ईमानदारी के साथ, नौ ग्रहों के देवताओं से अपनी इच्छा के लिए प्रार्थना करें।</p><p><br>रामलला दिशानिर्देश के श्री राम रक्षा यंत्र</p><p>आप इसे पूर्व दिशा में पश्चिम की ओर मुख करके या पूर्व में अपने पूजा स्थल में रख सकते हैं या इसे लाल कपड़े में लपेटकर अपने साथ ले जा सकते हैं<br>आप इसे फ्रेम के साथ या बिना फ्रेम के रख सकते हैं<br>अनुष्ठान पूजा अनिवार्य नहीं है और यह आपके द्वारा अपनाए जाने वाले आध्यात्मिक अनुशासन के अनुसार आप पर निर्भर करता है<br>कई लोगों ने यंत्र की नोक पर ध्यान लगाकर इसकी शक्ति देखी है<br>इस पर एक नज़र डालकर और अपनी प्रार्थनाएँ कहकर इसकी पूजा करें<br>यह इसमें निहित मंत्र की शक्ति के माध्यम से आपकी प्रार्थनाओं को प्रकट करके काम करता है</p><p>रामलला के श्री राम रक्षा यंत्र वितरण दिशानिर्देश</p><p>पूजा आमंत्रण कार्यक्रम पूरा होने के 15 से 20 दिनों में उत्पाद वितरण किया जाएगा।</p><p>संघों</p><p>प्रतिनिधित्व: भगवान राम<br>उद्देश्य: सभी बुराइयों का नाश करना और व्यक्ति को सभी प्रकार की कठिनाइयों से बचाना।<br>मंत्र: रामरक्षा स्तोत्र।</p>",
    "hindi_instruction": "सभी प्रकार की कठिनाइयों और बाधाओं से बचाता है|शक्ति और बुद्धि को आकर्षित करता है|समग्र समृद्धि, प्रसिद्धि और सफलता देता है",
    "image_urls": "https://hanumangadi.com/hanumangadi/media/product_images/76d74a023ecbc6afdd2174b802e0c281c49922d6.jpeg,https://hanumangadi.com/hanumangadi/media/product_images/e15fe0df618d728376a3cd076d116c70a0e6296b.jpeg,https://hanumangadi.com/hanumangadi/media/product_images/f1277eed5ab679c8d5f36c19b617ffe9a00ee1ac.jpeg,https://hanumangadi.com/hanumangadi/media/product_images/003d80d350cc1c641713484ffb1c7b6b0afadad8.jpg,https://hanumangadi.com/hanumangadi/media/product_images/fcc5ec0c1f21b27e6fd78466eea7c59e52636e17.jpg,https://hanumangadi.com/hanumangadi/media/product_images/a03cc2873f581a549522ee7594abd3637aec8529.jpg,https://hanumangadi.com/hanumangadi/media/product_images/4c1846085abf1b2c18ba0ab710fe2340eb7afb6b.jpg,https://hanumangadi.com/hanumangadi/media/product_images/ca87336d22de599749b6318ab50d47a3b29e2cbc.jpg,https://hanumangadi.com/hanumangadi/media/product_images/5f6057ffb27280073ca929083e72d9a6d8f9ac1b.jpg,https://hanumangadi.com/hanumangadi/media/product_images/4ee6a66f7a97ab871215ab2620a574e70cb7cfbb.jpg,https://hanumangadi.com/hanumangadi/media/product_images/9a5e522a37282e11fe2b937f43e4eb8d697d9df0.jpg,https://hanumangadi.com/hanumangadi/media/product_images/28424240a10c4809968991ad7df2cc00f08863d2.jpg,https://hanumangadi.com/hanumangadi/media/product_images/d60afe4f5014c1a0407b56353df91a4ac1c7f01a.jpg",
    "category_name": "Yantra",
    "stock_status_label": "In Stock"
}

const ProductByIdPage = () => {
    const [product, setProduct] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [qty, setQty] = useState<number>(1);
    const [added, setAdded] = useState(false);
    const [tab, setTab] = useState("description");
    // Allow multiple mobile sections to be open at once
    const [activeMobileSections, setActiveMobileSections] = useState<string[]>(["description"]);

    const { language } = useLanguageStore();

    useEffect(() => {
        setProduct(DUMMY_PRODUCT);

        const firstImage = DUMMY_PRODUCT.image_urls?.split(",")?.[0] || "";
        setSelectedImage(firstImage);
        setSelectedImageIndex(0);
    }, []);

    const images = useMemo(() => {
        return product?.image_urls
            ? product.image_urls
                .split(",")
                .map((img: string) => img.trim())
                .filter(Boolean)
            : [];
    }, [product]);

    if (!product) {
        return <div className="py-20 text-center">Loading...</div>;
    }

    const availableQty = Number(product.quantity) || 0;
    const inStock = availableQty > 0;
    const price = Number(product.price) || 0;
    const total = price * qty;

    const TABS = [
        { key: "description", label: language === "hi" ? "विवरण" : "Description" },
        {
            key: "benefits",
            label:
                language === "hi"
                    ? "लाभ"
                    : "Benefits",
        },
        {
            key: "info",
            label: language === "hi" ? "अतिरिक्त जानकारी" : "Additional Information",
        },
        { key: "guidelines", label: language === "hi" ? "निर्देश" : "Guidelines" },
    ];

    const benefits =
        (language === "hi" ? product.hindi_instruction : product.instruction)
            ?.split("|")
            .map((b: string) => b.trim())
            .filter(Boolean) || [];

    const descriptionHtml =
        language === "hi" ? product.hindi_description : product.description;

    const extraInfoHtml =
        language === "hi" ? product.hindi_extra_info : product.extra_info;

    const renderTabContent = (key: string) => {
        if (key === "description") {
            return descriptionHtml ? (
                <div
                    className="prose prose-sm max-w-none text-gray-800"
                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
            ) : (
                <p className="text-gray-500">
                    {language === "hi" ? "कोई विवरण नहीं मिला" : "No description found."}
                </p>
            );
        }

        if (key === "benefits") {
            return (
                <ul className="space-y-3 text-base md:text-lg text-gray-800">
                    {benefits.length > 0 ? (
                        benefits.map((b: string, i: number) => (
                            <li key={i} className="flex gap-2">
                                <span className="text-brand-brown">•</span>
                                <span>{b}</span>
                            </li>
                        ))
                    ) : (
                        <li>
                            {language === "hi" ? "कोई लाभ नहीं मिला" : "No benefits found."}
                        </li>
                    )}
                </ul>
            );
        }

        if (key === "info") {
            return (
                <div className="space-y-3 text-base md:text-lg text-gray-700">
                    <p>
                        <span className="font-semibold text-gray-900">
                            {language === "hi" ? "सामग्री" : "Matrial"}:
                        </span>{" "}
                        {product.matrial || "NA"}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-900">
                            {language === "hi" ? "वजन" : "Weight"}:
                        </span>{" "}
                        {product.weight || "NA"}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-900">
                            {language === "hi" ? "आकार" : "Size"}:
                        </span>{" "}
                        {product.size || "NA"}
                    </p>
                </div>
            );
        }

        if (key === "guidelines") {
            return extraInfoHtml ? (
                <div
                    className="prose prose-sm max-w-none text-gray-800"
                    dangerouslySetInnerHTML={{ __html: extraInfoHtml }}
                />
            ) : (
                <p className="text-gray-500">
                    {language === "hi"
                        ? "कोई दिशानिर्देश नहीं मिला"
                        : "No guidelines found."}
                </p>
            );
        }

        return null;
    };

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* LEFT SIDE */}
                <div>
                    {/* MAIN IMAGE */}
                    <div className="relative rounded-[28px] overflow-hidden border border-brand-brown/15 bg-gradient-to-br from-brand-cream to-brand-cream-dark aspect-square flex items-center justify-center shadow-sm">
                        {/* IMAGE COUNT */}
                        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md border border-white/40 shadow-md px-4 py-1.5 rounded-full text-sm font-semibold text-gray-700">
                            {selectedImageIndex + 1}/{images.length}
                        </div>

                        {/* IMAGE ANIMATION */}
                        <AnimatePresence mode="wait">
                            {selectedImage && (
                                <motion.div
                                    key={selectedImage}
                                    initial={{ opacity: 0, scale: 0.92 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.08 }}
                                    transition={{ duration: 0.35 }}
                                    className="w-full h-full bg-white/70 flex items-center justify-center"
                                >
                                    <Image
                                        src={selectedImage}
                                        alt={product.product_name}
                                        width={500}
                                        height={500}
                                        className="object-contain w-full h-full drop-shadow-md"
                                        unoptimized
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* THUMBNAILS */}
                    <div className="flex gap-3 mt-5 flex-wrap">
                        {images.map((img: string, index: number) => (
                            <button
                                type="button"
                                key={img}
                                onClick={() => {
                                    setSelectedImage(img);
                                    setSelectedImageIndex(index);
                                }}
                                className={`relative w-20 h-20 rounded-2xl overflow-hidden transition-all duration-300 border-2 ${selectedImage === img
                                    ? "border-brand-brown shadow-md scale-105"
                                    : "border-transparent hover:border-brand-brown/40"
                                    } bg-brand-cream`}
                            >
                                <Image
                                    src={img}
                                    alt={product.product_name}
                                    width={80}
                                    height={80}
                                    className="object-cover w-full h-full"
                                    unoptimized
                                />

                                {selectedImage === img && (
                                    <div className="absolute inset-0 bg-brand-brown/10" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col gap-5">
                    {/* CATEGORY */}
                    <span className="text-xs font-bold tracking-[0.25em] text-brand-brown uppercase bg-brand-brown/10 border border-brand-brown/15 rounded-full px-4 py-2 w-fit">
                        {product.category_name}
                    </span>

                    {/* TITLE */}
                    <h1 className="text-3xl md:text-5xl font-light text-gray-900 leading-tight">
                        {product.product_name}
                    </h1>

                    {/* PRICE */}
                    <div className="flex items-end gap-3">
                        <span className="text-4xl md:text-5xl font-semibold text-brand-brown">
                            ₹{total.toLocaleString("en-IN")}
                        </span>

                        <span className="text-sm text-gray-400 mb-1">
                            {language === "hi"
                                ? `के लिए ${qty} ${qty > 1 ? "यूनिट्स" : "यूनिट"}`
                                : `for ${qty} ${qty > 1 ? "units" : "unit"}`}
                        </span>
                    </div>

                    {/* STOCK */}
                    <div className="flex items-center gap-2 text-sm">
                        <FiCheckCircle
                            className={inStock ? "text-green-500" : "text-red-400"}
                            size={16}
                        />

                        <span
                            className={`font-semibold ${inStock ? "text-green-600" : "text-red-500"
                                }`}
                        >
                            {inStock
                                ? product.stock_status_label || "In Stock"
                                : language === "hi"
                                    ? "स्टॉक में नहीं"
                                    : "Out of Stock"}
                        </span>
                    </div>

                    {/* SHORT DESCRIPTION */}
                    {product.short_description && (
                        <div
                            className="prose prose-sm max-w-none text-gray-600"
                            dangerouslySetInnerHTML={{
                                __html:
                                    language === "hi"
                                        ? product.hindi_short_description
                                        : product.short_description,
                            }}
                        />
                    )}

                    {/* QUANTITY */}
                    <div className="flex items-center gap-4 pt-2">
                        <span className="text-base font-semibold text-gray-800">
                            {language === "hi" ? "मात्रा" : "Quantity"}
                        </span>

                        <div className="flex items-center bg-brand-cream-dark border border-orange-200 rounded-full overflow-hidden px-2 py-1 min-w-[120px]">

                            <button
                                type="button"
                                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                                className="w-8 h-8 flex items-center justify-center text-lg text-gray-700 hover:bg-brand-cream transition-colors rounded"
                                tabIndex={-1}
                                aria-label="Decrease quantity"
                            >
                                <FiMinus />
                            </button>

                            <input
                                type="text"
                                value={qty}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "");

                                    const numericValue = Number(value) || 1;

                                    setQty(
                                        Math.max(1, Math.min(availableQty, numericValue))
                                    );
                                }}
                                className="w-10 text-center outline-none text-base font-semibold bg-transparent border-none focus:ring-0"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setQty((prev) => Math.min(availableQty, prev + 1))
                                }
                                className="w-8 h-8 flex items-center justify-center text-lg text-gray-700 hover:bg-brand-cream transition-colors rounded"
                                tabIndex={-1}
                                aria-label="Increase quantity"
                            >
                                <FiPlus />
                            </button>
                        </div>
                    </div>

                    {/* BUTTON */}
                    <button
                        type="button"
                        className={`mt-3 w-full h-14 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 shadow-md transition-all duration-300 ${inStock
                            ? added
                                ? "bg-green-500 text-white"
                                : "btn-gradient-slide"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        disabled={!inStock}
                        onClick={() => {
                            setAdded(true);
                            setTimeout(() => setAdded(false), 2000);
                        }}
                    >
                        {inStock ? (
                            added ? (
                                <>
                                    <FiCheckCircle size={18} />
                                    {language === "hi"
                                        ? "कार्ट में जोड़ा गया!"
                                        : "Added to Cart!"}
                                </>
                            ) : (
                                <>
                                    <FiPackage size={18} />
                                    {language === "hi"
                                        ? "कार्ट में जोड़ें"
                                        : "Add to Cart"}
                                </>
                            )
                        ) : (
                            <>{language === "hi" ? "स्टॉक में नहीं" : "Out of Stock"}</>
                        )}
                    </button>
                </div>
            </div>

            {/* TABS SECTION */}
            <div className="max-w-6xl mx-auto mt-14">
                {/* DESKTOP */}
                <div className="hidden md:block">
                    {/* INTERACTIVE TAB BAR */}
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-2 shadow-sm border border-brand-brown/10 mb-8">
                        <div className="grid grid-cols-4 gap-2">
                            {TABS.map((t) => (
                                <button
                                    type="button"
                                    key={t.key}
                                    onClick={() => setTab(t.key)}
                                    className={`relative px-5 py-4 rounded-xl text-lg font-medium transition-all duration-300 ${tab === t.key
                                        ? "bg-brand-brown text-white shadow-md"
                                        : "text-gray-700 hover:bg-brand-brown/10 hover:text-brand-brown"
                                        }`}
                                >
                                    {t.label}

                                    {tab === t.key && (
                                        <motion.span
                                            layoutId="activeTab"
                                            className="absolute inset-0 rounded-xl bg-brand-brown -z-10"
                                            transition={{
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* TAB CONTENT */}
                    <div className="bg-white/60 rounded-[28px] border border-brand-brown/10 shadow-sm p-8 min-h-[180px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={tab}
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -14 }}
                                transition={{ duration: 0.25 }}
                            >
                                {renderTabContent(tab)}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* MOBILE ACCORDION */}
                <div className="md:hidden space-y-4">
                    {TABS.map((t) => {
                        const isOpen = activeMobileSections.includes(t.key);
                        return (
                            <div
                                key={t.key}
                                className="rounded-2xl border border-brand-brown/10 bg-white/70 shadow-sm overflow-hidden"
                            >
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveMobileSections((prev) =>
                                            prev.includes(t.key)
                                                ? prev.filter((k) => k !== t.key)
                                                : [...prev, t.key]
                                        );
                                    }}
                                    className="w-full flex items-center justify-between px-5 py-5 text-left"
                                >
                                    <span className="text-lg font-semibold text-gray-900">
                                        {t.label}
                                    </span>

                                    <span className="text-brand-brown text-xl">
                                        {isOpen ? <FiMinus /> : <FiPlus />}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                                                {renderTabContent(t.key)}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductByIdPage;
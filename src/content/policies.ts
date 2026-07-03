export type PolicySection = {
  title: string;
  content: string;
  subsections?: { title: string; content: string }[];
};

export type PolicyPageContent = {
  pageTitle: string;
  intro?: string;
  sections: PolicySection[];
};

export const privacyPolicyContent: PolicyPageContent = {
  pageTitle: "Privacy",
  intro:
    "At HANUMANGADI DOT COM (\"we\" or \"HANUMANGADI DOT COM\"), we prioritize your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect the information you provide while using our website or app, hanumangadi.com. Please review this policy to understand our practices.",
  sections: [
    {
      title: "1. Information We Collect",
      content: "",
      subsections: [
        {
          title: "a. Registration and Login",
          content:
            "To register and log in to hanumangadi.com, we collect your phone number. This information is used solely for account creation, security, and facilitating access to our services. No additional personal information is required during the registration and login process.",
        },
        {
          title: "b. Shipping Details",
          content:
            "When you make a purchase of Silver Yantras through hanumangadi.com, we collect your shipping details, including your name, address, and phone number, at the checkout page. This information is necessary to process and deliver your order. It is used exclusively for fulfilling your order and communicating with you about your purchase.",
        },
        {
          title: "c. Image",
          content:
            "Our app allows users to upload profile pictures for display within the application. These images are used only within the app and are not uploaded to our servers or used for any other purpose. Providing a profile picture is optional.",
        },
        {
          title: "d. Log Files, IP Address, and Cookies",
          content:
            "We and our third-party service providers may collect information about your visit to hanumangadi.com, including your IP address, browser type, and pages viewed. This information helps us troubleshoot technical issues, administer our website, and gather broad demographic data to improve our services. Cookies may be used to track user preferences and enhance your experience.",
        },
      ],
    },
    {
      title: "2. Security",
      content:
        "We do not handle or store payment information on our website. Payments are processed securely by third-party payment gateways. We follow industry-standard security measures to protect your personal data from unauthorized access. However, please note that no website can guarantee complete security.",
    },
    {
      title: "3. How Users May Request Data Deletion",
      content:
        "You may request the deletion of your account and personal information by emailing us at hanumangadiayodhya@gmail.com. Upon account deletion, all associated personal information will be removed from our systems.",
    },
    {
      title: "4. Other Website Links",
      content:
        "Our website may contain links to other websites. HANUMANGADI DOT COM is not responsible for the privacy practices of these external sites.",
    },
    {
      title: "5. Contacting Us",
      content:
        "If you have any questions about this Privacy Policy, our practices, or your interactions with our website, please contact us at hanumangadiayodhya@gmail.com.",
    },
    {
      title: "6. Disclaimer",
      content:
        "HANUMANGADI DOT COM does not have any other branches. If you purchase from elsewhere or encounter any duplicate sites or brands using our name, HANUMANGADI DOT COM will not be responsible for any issues arising from such transactions.",
    },
  ],
};

export const termsAndConditionsContent: PolicyPageContent = {
  pageTitle: "Terms and Condition",
  intro: "Terms of Use",
  sections: [
    {
      title: "1. ACCEPTANCE OF TERMS",
      content:
        "By accessing or using hanumangadi.com (\"HANUMANGADI DOT COM\"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website or services.",
    },
    {
      title: "2. DESCRIPTION OF SERVICES",
      content:
        "HANUMANGADI DOT COM is an e-commerce platform specializing in the sale of silver yantras and related spiritual products and services offered through hanumangadi.com.",
    },
    {
      title: "3. MEMBER ELIGIBILITY",
      content:
        "You must be at least 18 years of age to use our services. If you are under 18, you may use our website only with the involvement and consent of a parent or legal guardian.",
    },
    {
      title: "4. ACCOUNT REGISTRATION",
      content:
        "To access certain features, you may need to register an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
    },
    {
      title: "5. ORDER AND PAYMENT",
      content:
        "All orders are subject to acceptance and availability. Payment must be made through the payment methods available on hanumangadi.com. We reserve the right to refuse or cancel any order at our discretion.",
    },
    {
      title: "6. DELIVERY",
      content:
        "We will make reasonable efforts to deliver products within the estimated timeframes communicated at checkout. Delivery timelines may vary based on location and product availability.",
    },
    {
      title: "7. REFUND & CANCELLATION POLICY",
      content:
        "Refund requests must be made within 24 hours via email to hanumangadiayodhya@gmail.com. No refunds will be provided for incorrect data submitted by the user. Cancellations are allowed within 24 hours of booking. Refund processing takes approximately seven business days. Silver yantras are generally non-returnable unless damaged upon delivery.",
    },
    {
      title: "8. MEMBER BEHAVIOR",
      content:
        "You agree to use hanumangadi.com only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use of the website.",
    },
    {
      title: "9. INTELLECTUAL PROPERTY",
      content:
        "All content on hanumangadi.com, including text, graphics, logos, and images, is the property of HANUMANGADI DOT COM and is protected by applicable intellectual property laws.",
    },
    {
      title: "10. DISCLAIMER OF WARRANTIES",
      content:
        "HANUMANGADI DOT COM provides the website and services on an \"as is\" and \"as available\" basis without warranties of any kind, either express or implied.",
    },
    {
      title: "11. LIMITATION OF LIABILITY",
      content:
        "To the fullest extent permitted by law, HANUMANGADI DOT COM shall not be liable for any indirect, incidental, or consequential damages. Our liability shall be limited to the amount paid by you for the product in question.",
    },
    {
      title: "12. INDEMNIFICATION",
      content:
        "You agree to indemnify and hold HANUMANGADI DOT COM harmless from any claims, damages, or expenses arising from your use of the website or violation of these terms.",
    },
    {
      title: "13. CHANGES TO TERMS",
      content:
        "HANUMANGADI DOT COM reserves the right to update or modify these Terms and Conditions at any time. Continued use of the website after changes constitutes acceptance of the revised terms.",
    },
    {
      title: "14. GOVERNING LAW AND JURISDICTION",
      content:
        "These terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Jaipur, Rajasthan.",
    },
    {
      title: "15. CONTACT INFORMATION",
      content:
        "PN 101 ground floor PN 54, Indrapasth colony, Jaipur- 302021 (Raj.) INDIA. Email: hanumangadiayodhya@gmail.com",
    },
    {
      title: "16. USAGE OF INFORMATION",
      content:
        "Information collected through hanumangadi.com is used to process orders, improve our services, communicate with users, and comply with legal obligations as described in our Privacy Policy.",
    },
  ],
};

export const deleteAccountContent: PolicyPageContent = {
  pageTitle: "Delete Your Account",
  intro:
    "Hanumangadi (HANUMANGADI DOT COM) allows users of the Hanumangadi mobile app and hanumangadi.com to request deletion of their account and associated personal data. This page explains how to submit a deletion request, what data is removed, and what may be retained.",
  sections: [
    {
      title: "How to Request Account Deletion",
      content:
        "To delete your Hanumangadi account, send an email to hanumangadiayodhya@gmail.com from the email address linked to your account (if applicable), or include your registered mobile number in the request. Use the subject line \"Account Deletion Request\" and confirm that you want your account and personal data deleted. We will verify your identity using your registered phone number before processing the request. Account deletion requests are typically processed within 7 business days.",
    },
    {
      title: "Data That Will Be Deleted",
      content: "",
      subsections: [
        {
          title: "Account Information",
          content:
            "Your registered phone number, account credentials, and any profile information stored on our servers will be permanently deleted.",
        },
        {
          title: "Profile Images",
          content:
            "Profile pictures uploaded within the app are stored on your device only. Deleting the app or clearing app data removes them locally. No profile images are stored on our servers.",
        },
        {
          title: "Associated Personal Data",
          content:
            "Personal information linked to your account, including saved shipping details and order history tied to your user profile, will be removed from our active systems upon account deletion.",
        },
      ],
    },
    {
      title: "Data That May Be Retained",
      content:
        "Certain information may be retained where required by law or for legitimate business purposes. This may include anonymized or aggregated usage data, records required for tax, accounting, or legal compliance, and information related to unresolved disputes or chargebacks. Any retained data is kept only for the minimum period required by applicable law and is not used for marketing purposes.",
    },
    {
      title: "Contact Us",
      content:
        "If you have questions about account deletion or your personal data, contact us at hanumangadiayodhya@gmail.com or call +91 8239455455. Address: Shri Ram Satsang Bhawan, Choti Chhavni Ayodhya, 224001, India.",
    },
  ],
};

export const returnRefundPolicyContent: PolicyPageContent = {
  pageTitle: "Return and Refund Policy",
  sections: [
    {
      title: "1. Return and Cancellation Policy",
      content: "",
      subsections: [
        {
          title: "Product",
          content:
            "Cancellations are allowed within 24 hours of booking or payment. Once a product has been received, returns are generally not accepted unless the item is damaged upon delivery. Silver yantras are non-returnable except in cases of damage reported within the stipulated time.",
        },
        {
          title: "Service",
          content:
            "For services, cancellations are permitted within 24 hours of booking. Once a service report or related deliverable has been provided, refunds may not be applicable.",
        },
      ],
    },
    {
      title: "2. How to Raise a Dispute",
      content:
        "To raise a dispute or request a refund, email us at hanumangadiayodhya@gmail.com within 24 hours of your order or service booking. Include your order details and a clear description of the issue.",
    },
    {
      title: "3. Non-responsiveness",
      content:
        "If we do not receive a response from you regarding a dispute or order query within a reasonable time, we may proceed based on the information available and our standard policies.",
    },
    {
      title: "4. Return Shipping Charges",
      content:
        "Return shipping charges, if applicable, will be communicated at the time of return approval. In most cases, return shipping costs are borne by the customer unless the return is due to our error or damaged delivery.",
    },
    {
      title: "5. Refund Processing",
      content:
        "Approved refunds are processed within approximately seven working days. The refund will be credited to the original payment method used during purchase.",
    },
    {
      title: "6. Packaging",
      content:
        "Products must be returned in their original packaging and condition where applicable. Damaged or incomplete returns may not qualify for a refund.",
    },
    {
      title: "7. Shipping Charges",
      content:
        "Shipping charges paid at checkout are generally non-refundable unless the return or cancellation is due to an error on our part.",
    },
    {
      title: "8. Estimated Delivery Time",
      content:
        "Domestic orders are typically delivered within 7 working days. International orders may take up to 15 working days depending on location and courier availability.",
    },
    {
      title: "9. Delivery Method",
      content:
        "Orders are shipped through trusted courier partners including BlueDart, FedEx, and Indian Speed Post based on destination and service availability.",
    },
    {
      title: "10. International Deliveries",
      content:
        "International deliveries are subject to local customs regulations and additional processing time. Customers are responsible for any applicable customs duties or local taxes.",
    },
    {
      title: "11. Tracking Your Order",
      content:
        "Once your order is shipped, tracking information will be shared with you via email or SMS where available.",
    },
    {
      title: "12. Local Taxes",
      content:
        "Any applicable local taxes, duties, or levies are the responsibility of the customer and may be collected at the time of delivery.",
    },
    {
      title: "13. Disclaimer",
      content:
        "HANUMANGADI DOT COM does not have any other branches. If you purchase from elsewhere or encounter duplicate sites or brands using our name, HANUMANGADI DOT COM will not be responsible for any issues arising from such transactions.",
    },
  ],
};

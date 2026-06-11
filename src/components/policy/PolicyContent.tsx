import type { PolicyPageContent } from "@/content/policies";

export default function PolicyContent({ content }: { content: PolicyPageContent }) {
  return (
    <div className="space-y-6 text-[15px] leading-7 text-gray-800">
      {content.pageTitle === "Privacy" && (
        <>
          <p className="font-bold text-brand-brown text-lg">Privacy Policy</p>
          {content.intro && <p>{content.intro}</p>}
        </>
      )}

      {content.pageTitle === "Terms and Condition" && content.intro && (
        <p className="font-bold text-brand-brown">{content.intro}</p>
      )}

      {content.sections.map((section) => (
        <section key={section.title} className="space-y-3">
          <h2 className="font-bold text-brand-brown text-base md:text-lg">
            {section.title}
          </h2>

          {section.content && <p>{section.content}</p>}

          {section.subsections?.map((sub) => (
            <div key={sub.title} className="space-y-2">
              <h3 className="font-bold text-gray-900">{sub.title}</h3>
              <p>{sub.content}</p>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

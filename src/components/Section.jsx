import { useState } from "react";
import {
  AlertCircle,
  BadgeCheck,
  CheckCircle,
  ShieldCheck,
  ShieldPlus,
  ShieldX,
} from "lucide-react";

export default function Component() {
  const [url, setUrl] = useState("");
  const [strictness, setStrictness] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  console.log(result);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the URL to your backend for analysis
    try {
      const response = await fetch("http://127.0.0.1:5000/scan-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          strictness: strictness,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to scan URL");
      }

      const data = await response.json();
      setResult(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
    // Reset the input field after submission
    setUrl("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="#">
          <ShieldCheck className="h-6 w-6 mr-2" />
          <span className="text-xl font-bold">PhishGuard</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-10">
          <a
            className=" text-md font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </a>
          <a
            className=" text-md font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </a>
          <a
            className=" text-md font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </a>
          <a
            className=" text-md font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 xl:pt-32 pb-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl pb-2 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Protect Yourself from Phishing Attacks
                </h1>
                <p className="mx-auto text-gray-500 md:text-xl pb-5 dark:text-gray-400">
                  Our advanced AI-powered tool detects malicious URLs and keeps
                  you safe online.
                </p>
              </div>
              <div className="space-y-2">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <input
                    className="flex-1 border text-lg min-w-[25em] p-2 rounded-md"
                    placeholder="Enter a URL to check"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                  <button
                    className=" hover:bg-black/70 hover:text-white bg-black/20 flex gap-1 items-center font-[400] p-2 px-3 rounded-md"
                    type="submit"
                  >
                    <ShieldPlus strokeWidth={1} />
                    Check URL
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-center mx-auto">
          {result && (
            <div className="border w-[300px] mb-10 rounded-md">
              <div className="gap-5 p-4 flex flex-col items-center">
                {result.phishing ? (
                  <div className="flex items-center gap-2">
                    <BadgeCheck size={30} color="#F95454" />
                    <p className=" text-[#F95454] text-nowrap text-2xl font-[600]">
                      Website is Unsafe
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <BadgeCheck size={30} color="#15B392" />
                    <p className=" text-[#15B392] text-2xl font-[600]">
                      Website is safe
                    </p>
                  </div>
                )}
                <div>
                  <div className=" grid grid-cols-2 gap-5 font-[400]">
                    <p className="p-1 rounded-md">
                      {result.malware ? (
                        <div className="flex items-center gap-2  border p-2">
                          <ShieldX size={28} />
                          <div>
                            <p className=" font-[500]">Malware</p>
                            <p className=" font-[300]">Yes</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2  border p-2">
                          <ShieldCheck size={28} />
                          <div>
                            <p className=" font-[500]">Malware</p>
                            <p className=" font-[300]">No</p>
                          </div>
                        </div>
                      )}
                    </p>
                    <p className="p-1 rounded-md">
                      {result.phishing ? (
                        <div className="flex items-center gap-2  border p-2">
                          <ShieldX size={28} />
                          <div>
                            <p className=" font-[500]">Phishing</p>
                            <p className=" font-[300]">Yes</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 border p-2">
                          <ShieldCheck size={28} />
                          <div>
                            <p className=" font-[500]">Phishing</p>
                            <p className=" font-[300]">No</p>
                          </div>
                        </div>
                      )}
                    </p>
                    <div className="p-1 mb-3 relative col-span-2 flex flex-col justify-center rounded-md">
                      <p>Risk Score: {result.risk_score}</p>
                      <hr className=" absolute z-0 w-full border-[0.2em] rounded-full -bottom-2" />
                      <hr className={`absolute z-10 border-[0.2em] rounded-full -bottom-2 ${result.phishing > 85 ? "border-[#F95454]" : result.risk_score > 50 ? "border-[#FABC3F]" : "border-[#15B392]"}`} style={{width: `${result.risk_score}%` }} />
                      {/* {result.risk_score} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="w-full py-12 md:py-12 lg:py-12 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col py-10 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_5px] items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <CheckCircle className="h-10 w-10 text-green-500" />
                <h2 className="text-xl font-bold">Real-time Detection</h2>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Instantly analyze URLs for potential threats.
                </p>
              </div>
              <div className="flex flex-col py-10 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_5px]  items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <AlertCircle className="h-10 w-10 text-red-500" />
                <h2 className="text-xl font-bold">Comprehensive Analysis</h2>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Check against multiple security databases and AI models.
                </p>
              </div>
              <div className="flex flex-col py-10 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_5px]  items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <ShieldCheck className="h-10 w-10 text-blue-500" />
                <h2 className="text-xl font-bold">Stay Protected</h2>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Get alerts and recommendations to stay safe online.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Dhruv Gupta. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}

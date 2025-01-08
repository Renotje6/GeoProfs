import Image from "next/image";
import Link from "next/link";
import logo from "../logo/crown.png";
import arrow_left from "../image/arrow-left.png"
import Avatar from "../image/Avatar.png"
export default function Verlof() {
  return (
    <div className="inlog_section w-full flex justify-center items-center h-screen">
      <div className="inlog_form w-full lg:w-1/2 flex justify-center items-center h-full relative">
       
       {/* Headerverlof */}
       <div className="absolute w-full flex flex-col gap-3 top-0 p-3">
        <div className="header_verlof bg-achterground rounded-xl flex justify-between items-center p-2">
             <div className="verlog">
                <Link href="" className="flex justify-center items-center">
                <Image
                src={logo}
                alt="Logo"
                width={30}
                height={30}/>
                <h2 className="text-xl font-medium tracking-wide hidden md:hidden lg:block">GEOPROFS</h2>
                </Link>
             </div>
             <div className="user flex justify-center items-center gap-1">
                <h2 className="font-bold text-lg tracking-wide">Username</h2>
                <Image
                src={Avatar}
                alt="Avatar"
                width={40}
                height={40}/>
             </div>
        </div>
        <div className="terug bg-achterground w-fit rounded-xl">
          <Link href="/" className="flex justify-center items-center p-2 gap-1">
          <Image
           src={arrow_left}
           alt="Arrow left" 
           width={20}
           height={20}/>
           <p className="font-medium">Terug</p>
          </Link>
        </div>
       </div>


        <form className="flex flex-col gap-4">
          <div className="flex justify-center items-center gap-2">
            <h2 className="text-3xl font-medium tracking-wide">
              NIEUWE AANVRAAG
            </h2>
          </div>

          {/* <!--  CATEGORIE --> */}

          <div className="relative">
            <select
              className="btn-style rounded-xl p-3 pr-10 text-customGray"
              style={{
                appearance: "none",
                background: "none",
                paddingRight: "1em",
              }}
            >
              <option value="" disabled selected hidden>
                CATEGORIE
              </option>
              <option value="Vakantie">Vakantie</option>
            </select>
            <span
              className="absolute right-3 top-4 cursor-pointer w-5 h-5 rounded-xl" // Positie van het oog-icoon
            ></span>
          </div>

          {/* Start Datum */}
          <div className="relative">
            <input
              className="rounded-xl p-3 btn-style"
              type="date"
              placeholder="START DATUM"
            />
          </div>

          {/* Eind DATUM */}

          <div className="relative">
            <input
              className="rounded-xl p-3 btn-style"
              type="date"
              placeholder="EIND DATUM"
            />
           
          </div>

          {/* Extra informatie  */}
          <textarea
            placeholder="EXTRA INFORMATIE"
            className="rounded-xl p-3 pr-10 btn-style"
            rows={1}
            cols={1}
          ></textarea>
          {/* submit */}
          <input
            className="btn font-medium bg-button rounded-xl py-3 text-white cursor-pointer"
            type="submit"
            value="INDIENEN"
          />
        </form>
      </div>

      {/**/}
      <div className="inlog_logo w-1/2 flex justify-center items-center bg-hero h-full hidden xl:flex">
        <Image src={logo} width={61} height={61} alt="Logo" priority />
        <h2 className="text-4xl font-medium uppercase">Geoprofs</h2>
      </div>
    </div>
  );
}
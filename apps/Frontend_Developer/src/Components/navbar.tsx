import { RiArrowDropDownLine } from 'react-icons/ri';
import { BsCartCheckFill } from 'react-icons/bs';
export function NavBar() {
  return (
    <div className="w-full h-[65px] px-[64px] flex items-center justify-between gap-[24px] bg-[#1D3557] ">
      <div className="flex justify-between items-center gap-[24px]">
        <div className=" h-[20px] w-[100px] italic font-serif font-bold text-white text-2xl">
          My_Cafe
        </div>
        <div className="text-white flex items-center justify-between pt-2 pl-3">
          <p> Select Location</p>

          <RiArrowDropDownLine className="text-white text-2xl pt-1" />
        </div>
      </div>
      <div>
        <input
          className=" h-[40px] w-[720px] rounded-lg bg-[#D9D9D9]"
          type="text"
          placeholder="search"
        />
      </div>
      <div>
        <button className="text-white text-2xl rounded bg-[#F4A261] w-36 h-11">
          Register
        </button>
      </div>

      <div className="">
        <BsCartCheckFill className="text-white h-[40px] w-[26px] text-3xl" />
      </div>
    </div>
  );
}

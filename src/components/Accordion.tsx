import { useState, useRef } from "react";
import { ChevronDownIcon } from "../assets/ChevronDown";
import DeleteIcon from "../assets/DeleteIcon";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { triggerGetAccounts } from "../atoms/atoms";

interface CreditCardSchema {
  _id: string;
  BankName: string;
  AccountNumber: string;
  Address?: string;
  AccountOverdue: number;
  CurrentBalance: number;
}

interface AccordionType {
  _id: string;
  Name: string;
  MobileNumber: number;
  CreditScore: number;
  PanNumber: string;
  TotalNumberOfAccounts: number;
  NumberOfActiveAccounts: number;
  NumberOfClosedAccount: number;
  CurrentBalanceAmount: number;
  SecuredAccountsAmount: number;
  UnsecuredAccountsAmount: number;
  Last7DaysCreditEnquiries: number;
  CreditCardsInfos: CreditCardSchema[];
}

const CreditCardAccordion = ({ card }: { card: CreditCardSchema }) => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden transition-all duration-300">
      {/* Header */}
      <div
        className="p-3 flex justify-between items-center cursor-pointer bg-gray-100"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className="font-semibold">{card.BankName}</div>
        <button>
          <ChevronDownIcon rotate={expanded} />
        </button>
      </div>

      {/* Expandable Content */}
      <div
        ref={contentRef}
        className="p-3 transition-all duration-300"
        style={{
          maxHeight: expanded ? `${contentRef.current?.scrollHeight}px` : "0px",
          overflow: "hidden",
        }}
      >
        <div>Account: {card.AccountNumber}</div>
        {card.Address && <div>Address: {card.Address}</div>}
        <div>Overdue: {card.AccountOverdue}</div>
        <div>Balance: {card.CurrentBalance}</div>
      </div>
    </div>
  );
};

export const Accordion = (props: AccordionType) => {
  const [show, setShow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const setTriggerGetAccounts = useSetRecoilState(triggerGetAccounts);

  return (
    <div
      className="w-[1000px] rounded-md border border-[#157FFE] overflow-hidden transition-all duration-300 ease-in-out"
      style={{
        maxHeight: show
          ? `${(contentRef.current?.scrollHeight || 0) + 30}px`
          : "44px",
      }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center px-6 h-[47px] border-b border-[#157FFE]">
        <div>Name: {props.Name}</div>
        <div>Mobile: {props.MobileNumber}</div>
        <div>PAN: {props.PanNumber}</div>
        <div>Credit Score: {props.CreditScore}</div>
        <button onClick={() => setShow((prev) => !prev)}>
          <ChevronDownIcon rotate={show} />
        </button>

        <button
          onClick={async () => {
            const res = await axios.delete(
              "https://test-backend-k3y5.onrender.com/getAccounts/delete",
              {
                headers: {
                  delete_id: props._id, // Replace _id with actual value
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );

            console.log(res.data);
            if (res.data.value) {
              setTriggerGetAccounts((r) => r + 1);
            }
          }}
          className="hover:text-red-700"
        >
          <DeleteIcon />
        </button>
      </div>

      {/* Collapsible Content */}
      <div
        ref={contentRef}
        className="px-6 transition-opacity duration-300 ease-in-out pb-5"
      >
        <div className="grid grid-cols-9 py-4">
          {/* Left Column */}
          <div className="col-span-3">
            <div>Name: {props.Name}</div>
            <div>Mobile: {props.MobileNumber}</div>
            <div>PAN: {props.PanNumber}</div>
            <div>Credit Score: {props.CreditScore}</div>
          </div>

          {/* Middle Column */}
          <div className="col-span-3">
            <div>Total Accounts: {props.TotalNumberOfAccounts}</div>
            <div>Active: {props.NumberOfActiveAccounts}</div>
            <div>Closed: {props.NumberOfClosedAccount}</div>
            <div>Balance: {props.CurrentBalanceAmount}</div>
            <div>Secured: {props.SecuredAccountsAmount}</div>
            <div>Unsecured: {props.UnsecuredAccountsAmount}</div>
            <div>
              Credit Enquiries (7 Days): {props.Last7DaysCreditEnquiries}
            </div>
          </div>

          {/* Right Column (Credit Card Details) */}
          <div className="col-span-3">
            <div className="font-semibold mb-2">Credit Card Details</div>

            {props.CreditCardsInfos.length > 0 ? (
              <div className="space-y-3">
                {props.CreditCardsInfos.map((card) => (
                  <CreditCardAccordion key={card._id} card={card} />
                ))}
              </div>
            ) : (
              <div className="text-gray-500">
                No credit card details available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

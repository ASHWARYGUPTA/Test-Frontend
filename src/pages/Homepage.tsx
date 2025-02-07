import { useEffect } from "react";
import { Accordion } from "../components/Accordion";
import { InputForm } from "../components/InputForm";
import { Navbar } from "../components/Navbar";
// import { Loader } from "../components/Loader";
import { Button } from "../ui/Button";
import { v4 as uuidv4 } from "uuid";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import {
  GetAccounts,
  isSignedIn,
  triggerGetAccounts,
  triggerIsSignedIn,
} from "../atoms/atoms";
import axios from "axios";

export const HomePage = () => {
  const setTriggerGetAccounts = useSetRecoilState(triggerGetAccounts);
  const setTriggerIsSignedIn = useSetRecoilState(triggerIsSignedIn);

  const valueGetAccounts = useRecoilValueLoadable(GetAccounts);
  const valueIsSignedIn = useRecoilValueLoadable(isSignedIn);

  useEffect(() => {
    setTriggerGetAccounts((r) => r + 1);
    setTriggerIsSignedIn((r) => r + 1);
  }, []);

  if (
    valueIsSignedIn.state === "loading" ||
    valueGetAccounts.state === "loading"
  ) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          Fetching Data Please Wait
        </div>
      </>
    );
  }

  if (valueIsSignedIn.contents === false) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl font-semibold">
            You are not signed in. Please log in.
          </p>
        </div>
      </>
    );
  }

  const accountsData = valueGetAccounts.contents;
  console.log(accountsData);

  return (
    <>
      <Navbar
        RightNav={
          <>
            <Button
              typeButton="button"
              typeStyle="danger"
              onClick={async () => {
                // console.log("Hi");
                const res = await axios.get("http://localhost:3000/logout", {
                  withCredentials: true,
                });

                if (res.data.value) {
                  setTriggerIsSignedIn((r) => r + 1);
                  setTriggerGetAccounts((r) => r + 1);
                }
              }}
            >
              Logout
            </Button>
          </>
        }
      />
      <div className="mt-[70px]">
        <div className="flex justify-center items-center">
          <InputForm />
        </div>
        <div className="flex justify-center items-center flex-col gap-[30px]">
          {/*@ts-ignore */}
          {accountsData?.map((account) => (
            <Accordion
              key={account._id}
              _id={account._id}
              Name={account.Name}
              MobileNumber={account.MobileNumber}
              CreditScore={account.CreditScore}
              PanNumber={account.PanNumber}
              TotalNumberOfAccounts={account.TotalNumberOfAccounts}
              NumberOfActiveAccounts={account.NumberOfActiveAccounts}
              NumberOfClosedAccount={account.NumberOfClosedAccount}
              CurrentBalanceAmount={account.CurrentBalanceAmount}
              SecuredAccountsAmount={account.SecuredAccountsAmount}
              UnsecuredAccountsAmount={account.UnsecuredAccountsAmount}
              Last7DaysCreditEnquiries={account.Last7DaysCreditEnquiries}
              //@ts-ignore
              CreditCardsInfos={account.CreditCardsInfos?.map((card) => ({
                _id: uuidv4(),
                BankName: card.BankName,
                AccountNumber: card.AccountNumber,
                Address: card.Address,
                AccountOverdue: card.AccountOverdue,
                CurrentBalance: card.CurrentBalance,
              }))}
            />
          ))}
        </div>
      </div>
    </>
  );
};

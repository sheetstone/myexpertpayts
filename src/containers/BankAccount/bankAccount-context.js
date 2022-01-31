import React, { useState } from "react";

import { getBanks, deleteBank, updateBank } from "api/bank/bankApi";

export const BankAccountContext = React.createContext({
  bankData: null,
  showEditBank: null,
  toggleEditBank: () => {},
  delBank: () => {},
  verifyBank: () => {},
  loadBank: () => {},
});

const BankAccountContextProvider = (props) => {
  const [bankData, setBankData] = useState([]);
  const [showEditBank, setShowEditBank] = useState(false);

  const loadBank = async () => {
    console.log("Called reload");
    const result = await getBanks();
    setBankData(result);
    return { success: true };
  };

  const delBank = async (key) => {
    await deleteBank(key);
    loadBank();
  };

  const toggleEditBank = (open) => {
    setShowEditBank(open);
  };

  const verfiyBank = async (key) => {
    const newBankItem = { ...bankData[key] };
    newBankItem.verified = true;
    await updateBank(key, newBankItem);
    loadBank();
  };

  return (
    <BankAccountContext.Provider
      value={{
        bankData: bankData,
        showEditBank: showEditBank,
        toggleEditBank: toggleEditBank,
        delBank: delBank,
        verifyBank: verfiyBank,
        loadBank: loadBank,
      }}
    >
      {props.children}
    </BankAccountContext.Provider>
  );
};

export default BankAccountContextProvider;

import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// import { BankAccountContext } from './bankAccount-context'
import LoadingIndicator from 'components/UI/LoadingIndicator/LoadingIndicator'
import BankList from './BankList/bankList'
import EditBankAccount from './EditBankForm/editBankAccount'
import { useBanks } from 'api/bank/bank.store'

const BankAccountContainer = (props:any) => {
  const [isLoading, setIsLoading] = useState(true);
  const { showEditBank, toggleEditBank, loadBank, error } = useBanks([]);

  useEffect(()=>{
    loadBank().then(stat=>{
      if(stat.success){
        setIsLoading(false);
      }
    });
  }, [])

  return (
    <>
      <Button variant='primary' onClick={() => toggleEditBank(true)}>
        <FontAwesomeIcon icon={faPlus} color='#ffffff' />
        &nbsp;New Bank Account
      </Button>
      <hr />
      {isLoading && <LoadingIndicator />}
      {!isLoading && <BankList />}
      {error && <p>{error}</p>}
      <EditBankAccount
        show={showEditBank}
        onHide={() => toggleEditBank(false)}
        reloadState={loadBank}
      />
    </>
  )
}

export default BankAccountContainer

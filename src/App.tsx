import React, { useRef, useState } from 'react';

const App = () => {
  const [holderName, setHolderName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryMonth, setExpiryMonth] = useState<string>('');
  const [expiryYear, setExpiryYear] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');
  const holderNameErrorRef = useRef<HTMLInputElement>(null);
  const cardNumberErrorRef = useRef<HTMLInputElement>(null);
  const expiryDateErrorRef = useRef<HTMLInputElement>(null);
  const cvcErrorRef = useRef<HTMLInputElement>(null);
  const holderNameInputRef = useRef<HTMLInputElement>(null);
  const cardNumberInputRef = useRef<HTMLInputElement>(null);
  const expiryMonthInputRef = useRef<HTMLInputElement>(null);
  const expiryYearInputRef = useRef<HTMLInputElement>(null);
  const cvcInputRef = useRef<HTMLInputElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const thankyouContainerRef = useRef<HTMLDivElement>(null);
  const valueMissingErrorMsg = "Can't be blank";
  const wrongFormatMsg = 'Wrong format, numbers only';
  const wrongCardFormat = 'Invalid card number';
  const threeTooShortMsg = 'Must be three characters';
  const twoTooShortMsg = 'Must be two characters';

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { target } = e;

    if (!target.checkValidity()) {
      switch (target.id) {
        case 'cardholder-name':
          if (holderNameErrorRef.current) {
            holderNameErrorRef.current.innerHTML = valueMissingErrorMsg;
            setHolderName(target.value);
          }
          target.style.borderColor = 'hsl(0, 100%, 66%)';
          break;
        case 'card-number':
          if (cardNumberErrorRef.current) {
            cardNumberErrorRef.current.innerHTML = target.validity.valueMissing
              ? valueMissingErrorMsg
              : wrongCardFormat;
            setCardNumber(target.value);
          }
          target.style.borderColor = 'hsl(0, 100%, 66%)';
          break;
        case 'mm':
          if (expiryDateErrorRef.current) {
            expiryDateErrorRef.current.innerHTML = target.validity.valueMissing
              ? valueMissingErrorMsg
              : twoTooShortMsg;
            setExpiryMonth(target.value);
          }
          target.style.borderColor = 'hsl(0, 100%, 66%)';
          break;
        case 'yy':
          if (expiryDateErrorRef.current) {
            expiryDateErrorRef.current.innerHTML = target.validity.valueMissing
              ? valueMissingErrorMsg
              : twoTooShortMsg;
            setExpiryYear(target.value);
          }
          target.style.borderColor = 'hsl(0, 100%, 66%)';
          break;
        case 'cvc':
          if (cvcErrorRef.current) {
            cvcErrorRef.current.innerHTML = target.validity.valueMissing
              ? valueMissingErrorMsg
              : threeTooShortMsg;
            setCvc(target.value);
          }
          target.style.borderColor = 'hsl(0, 100%, 66%)';
          break;
        default:
          break;
      }
    } else {
      switch (target.id) {
        case 'cardholder-name':
          setHolderName(target.value);
          if (holderNameErrorRef.current) {
            holderNameErrorRef.current.innerHTML = '';
          }
          target.style.borderColor = '';
          break;
        case 'card-number':
          const cardNum = Number(target.value.split(' ').join(''));
          if (isNaN(cardNum)) {
            if (cardNumberErrorRef.current) {
              cardNumberErrorRef.current.innerHTML = wrongFormatMsg;
            }
            target.style.borderColor = 'hsl(0, 100%, 66%)';
          } else if (
            target.value.charAt(4) !== ' ' ||
            target.value.charAt(9) !== ' ' ||
            target.value.charAt(14) !== ' '
          ) {
            setCardNumber(target.value);
            if (cardNumberErrorRef.current) {
              cardNumberErrorRef.current.innerHTML = wrongCardFormat;
            }
            target.style.borderColor = 'hsl(0, 100%, 66%)';
          } else {
            setCardNumber(target.value);
            if (cardNumberErrorRef.current) {
              cardNumberErrorRef.current.innerHTML = '';
            }
            target.style.borderColor = '';
          }
          break;
        case 'mm':
          const mmNum = Number(target.value);
          if (isNaN(mmNum)) {
            if (expiryDateErrorRef.current) {
              expiryDateErrorRef.current.innerHTML = wrongFormatMsg;
            }
            target.style.borderColor = 'hsl(0, 100%, 66%)';
          } else {
            setExpiryMonth(target.value);
            if (expiryDateErrorRef.current) {
              expiryDateErrorRef.current.innerHTML = '';
            }
            target.style.borderColor = '';
          }
          break;
        case 'yy':
          const yyNum = Number(target.value);
          if (isNaN(yyNum)) {
            if (expiryDateErrorRef.current) {
              expiryDateErrorRef.current.innerHTML = wrongFormatMsg;
            }
            target.style.borderColor = 'hsl(0, 100%, 66%)';
          } else {
            setExpiryYear(target.value);
            if (expiryDateErrorRef.current) {
              expiryDateErrorRef.current.innerHTML = '';
            }
            target.style.borderColor = '';
          }
          break;
        case 'cvc':
          const cvcNum = Number(target.value);
          if (isNaN(cvcNum)) {
            if (cvcErrorRef.current) {
              cvcErrorRef.current.innerHTML = wrongFormatMsg;
            }
            target.style.borderColor = 'hsl(0, 100%, 66%)';
          } else {
            setCvc(target.value);
            if (cvcErrorRef.current) {
              cvcErrorRef.current.innerHTML = '';
            }
            target.style.borderColor = '';
          }
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = () => {
    if (
      !holderNameInputRef.current?.value &&
      !cardNumberInputRef.current?.value &&
      !expiryMonthInputRef.current?.value &&
      !expiryYearInputRef.current?.value &&
      !cvcInputRef.current?.value
    ) {
      const inputLists = [
        holderNameErrorRef,
        cardNumberErrorRef,
        expiryDateErrorRef,
        cvcErrorRef,
      ];
      inputLists.forEach((val) => {
        if (val.current) {
          val.current.innerHTML = valueMissingErrorMsg;
        }
      });
    } else if (
      holderNameInputRef.current?.value &&
      cardNumberInputRef.current?.value &&
      expiryMonthInputRef.current?.value &&
      expiryYearInputRef.current?.value &&
      cvcInputRef.current?.value
    ) {
      holderNameInputRef.current.value = '';
      cardNumberInputRef.current.value = '';
      expiryMonthInputRef.current.value = '';
      expiryYearInputRef.current.value = '';
      cvcInputRef.current.value = '';
      if (mainContainerRef.current && thankyouContainerRef.current) {
        mainContainerRef.current.style.display = 'none';
        thankyouContainerRef.current.style.display = 'block';
      }
    }
  };

  const handleReset = () => {
    if (mainContainerRef.current && thankyouContainerRef.current) {
      mainContainerRef.current.style.display = 'block';
      thankyouContainerRef.current.style.display = 'none';
    }
    setHolderName('');
    setCardNumber('');
    setCvc('');
    setExpiryMonth('');
    setExpiryYear('');
  };

  return (
    <main className='container'>
      <div className='main-bg'></div>
      <div className='content-container'>
        <aside className='card-container'>
          <div className='front-card card'>
            <div className='inner-card'>
              <img
                src='/images/card-logo.svg'
                alt='card logo'
                className='card-logo'
              />
              <h1>{cardNumber ? cardNumber : '0000 0000 0000 0000'}</h1>
              <p>
                {' '}
                <span>{holderName ? holderName : 'Jane Appleseed'}</span>
                <span>
                  {expiryMonth ? expiryMonth : '00'}/
                  {expiryYear ? expiryYear : '00'}
                </span>{' '}
              </p>
            </div>
          </div>
          <div className='back-card card'>
            <p>{cvc ? cvc : '000'}</p>
          </div>
        </aside>
        <div className='main-container' ref={mainContainerRef}>
          <form action=''>
            <div className='input-container long-input'>
              <label htmlFor='cardholder-name'>Cardholder Name</label>
              <input
                type='text'
                required
                id='cardholder-name'
                placeholder='e.g. Jane Appleseed'
                ref={holderNameInputRef}
                onChange={handleOnChange}
              />
              <span className='error' ref={holderNameErrorRef}></span>
            </div>
            <div className='input-container long-input'>
              <label htmlFor='card-number'>Card Number</label>
              <input
                type='text'
                required
                id='card-number'
                minLength={19}
                maxLength={19}
                placeholder='e.g. 1234 5678 9123 0000'
                ref={cardNumberInputRef}
                onChange={handleOnChange}
              />
              <span className='error' ref={cardNumberErrorRef}></span>
            </div>
            <div className='extra-card-info'>
              <div className='expiry-date-container'>
                <label htmlFor=''>Exp. Date (MM/YY)</label>
                <div className='expiry-date'>
                  <div className='input-container'>
                    <input
                      type='text'
                      required
                      placeholder='MM'
                      id='mm'
                      minLength={2}
                      maxLength={2}
                      ref={expiryMonthInputRef}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className='input-container'>
                    <input
                      type='text'
                      required
                      minLength={2}
                      maxLength={2}
                      placeholder='YY'
                      id='yy'
                      ref={expiryYearInputRef}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <span className='error ' ref={expiryDateErrorRef}></span>
              </div>
              <div className='input-container cvc-container'>
                <label htmlFor='cvc'>cvc</label>
                <input
                  type='text'
                  required
                  minLength={3}
                  maxLength={3}
                  id='cvc'
                  placeholder='e.g. 123'
                  ref={cvcInputRef}
                  onChange={handleOnChange}
                />
                <span className='error' ref={cvcErrorRef}></span>
              </div>
            </div>
            <button type='button' className='submit-btn' onClick={handleSubmit}>
              Confirm
            </button>
          </form>
        </div>
        <div className='thank-you' ref={thankyouContainerRef}>
          <img
            src='/images/icon-complete.svg'
            alt='complete icon'
            className='icon-complete'
          />
          <h2>Thank you!</h2>
          <p>We've added your card details</p>
          <button type='button' className='submit-btn' onClick={handleReset}>
            Continue
          </button>
        </div>
      </div>
      <footer className='attribution'>
        Challenge by
        <a href='https://www.frontendmentor.io?ref=challenge' target='_blank'>
          Frontend Mentor
        </a>
        . Coded by{' '}
        <a href='https://www.frontendmentor.io/profile/iamprincetj'>
          Justin Nwanze
        </a>
        .
      </footer>
    </main>
  );
};

export default App;

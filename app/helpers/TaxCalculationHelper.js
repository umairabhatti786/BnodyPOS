// import React, { useEffect, useRef, useState } from 'react';
// import { getDataById } from '../sqliteHelper';
// import { TaxRateParentListTable } from '../sqliteTables/TaxRateParentList';
// const calculateTaxableAmount = (calcID, amount, addCharges, discount = 0, tax1Amount = 0, tax2Amount = 0, totalCharges = 0) => {
//   // console.log("calculation of tax amount ", calcID, amount, addCharges, discount, tax1Amount, tax2Amount, totalCharges)

//   let calcAmount = 0;

//   switch (calcID) {
//     case 1:     // subtotal after discount => on all places subtotal is same
//       calcAmount = amount - discount;
//       break;
//     case 2:     // Tax 1 Amount
//       calcAmount = tax1Amount;
//       break;
//     case 3:     // Amount before Discount + Tax 1 Amount
//       calcAmount = (amount - discount) + tax1Amount;
//       break;

//     // Following will be applicable on Invoice Taxes
//     case 4:     // Expenditures
//       calcAmount = totalCharges;
//       break;
//     case 5:     // SubTotal + Expenditures
//       calcAmount = (amount - discount) + totalCharges;
//       break;
//     case 6:     // SubTotal + Expenditures
//       calcAmount = (amount - discount) + totalCharges + tax1Amount;
//       break;

//     case 7:
//       calcAmount = (amount - discount) + totalCharges + tax1Amount;
//       break;
//     case 8: // Calculate Before Discount
//       calcAmount = amount;
//       break;
//     case 9: // Calculate After Discount
//       calcAmount = amount - discount;
//       break;
//     default:
//       // console.log("Taxsetup.calculateTaxableAmount ; calculation id is not found. calculation is implementing on SubTotal");
//       calcAmount = (amount - discount);
//       break;
//   }

//   return calcAmount;

// }

// const calculateTaxeGroups = async (quantity, price, discountAmount, taxGroupID, currencyRate = 1, addCharges = null, totalCharges = 0, settings = null, OrignalPrice = 0, discountrate = 0, gbt) => {

//   let taxAmountIncluded = 0,
//     amount = 0,
//     amountBeforeDiscount = price,
//     amountAfterTax = 0,
//     selectedproductTaxes, amt = 0;
//   // amountBeforeDiscount = price;
//   var taxes = {};

//   let orgQuantity = quantity,
//     isAfterDiscountCase = false,
//     afterDiscountTax = 0;
//   taxes.Price = 0
//   //added by sheraz 15-07-2020
//   //if (quantity == 0)
//   //    quantity = 1;
//   // console.log("amountBeforeDiscount ", amountBeforeDiscount, price)
//   if (amountBeforeDiscount > 0 && quantity > 0) {
//     taxes.Price = amountBeforeDiscount / (quantity * currencyRate); // amountBeforeDiscount;NEED TO CHANGE ON ADDON
//     // console.log("taxes.Price...1 ", taxes.Price)
//   }

//   if (taxGroupID === null || taxGroupID === "" || (settings.IsTaxOnSalesProduct === "false" && !gbt)) {
//     taxes.Tax1Code = "";
//     taxes.Tax1Name = "";
//     taxes.Tax1Amount = 0;
//     taxes.Tax2Amount = 0;
//     taxes.Tax2Fragment = 0;
//     taxes.Tax1Fragment = 0;

//     taxes.Tax2Code = "";
//     taxes.Tax2Name = "";
//     taxes.Price = Number(taxes.Price?.toFixed(settings.DecimalsInAmount));
//     return taxes;
//   }
//   let calcID = 0,
//     rate = 0,
//     disc = 0;
//   if (taxGroupID != "") {

//     //var selectedproductTaxes = taxData.Find(x => x.TaxGroupCode == taxGroupID);
//     //my side TaxRateParent selectedproductTaxes = manager.TaxRateMasterManager.TaxRateParent_Select(taxGroupID);
//     //get selected tax information & calculation methods
//     await getDataById(
//       TaxRateParentListTable,
//       'TaxFamilyCode',
//       taxGroupID,
//       tax => {
//         console.log("tax..........", tax[0])
//         selectedproductTaxes = tax[0]
//       })

//     // selectedproductTaxes = {
//     //   "IsTax2InclusiveInPrice": "false",
//     //   "Tax2CalculationID": 0,
//     //   "Tax2Value": 0,
//     //   "Tax2Fragment": "0",
//     //   "NamesTable": "",
//     //   "Tax2Name": "",
//     //   "Tax2Code": "",
//     //   "Tax2Enable": "false",
//     //   "IsTax1InclusiveInPrice": "true",
//     //   "Tax1Enable": "true",
//     //   "TaxFamilyName": "ضريبة منتج",
//     //   "Tax1CalculationID": 9,
//     //   "Tax1Value": 15,
//     //   "Tax1Fragment": 1,
//     //   "Tax1Name": "VAT",
//     //   "UserCode": 0,
//     //   "Tax1Code": "1",
//     //   "TaxLevel": 1,
//     //   "TaxFamilyCode": "2"
//     // }
//     if (selectedproductTaxes != null) {
//       // console.log("selectedproductTaxes...", selectedproductTaxes)

//       let discount = 0;
//       if (discountAmount > 0) //??
//         discount = discountAmount;

//       taxes.Tax1Enable = selectedproductTaxes.Tax1Enable
//       taxes.Tax2Enable = selectedproductTaxes.Tax2Enable
//       //// Tax1Amount Calculation

//       if (selectedproductTaxes.Tax1Enable === "true" && selectedproductTaxes.Tax1Code != "") {

//         //if (calcID != 9 || calcID != 1)
//         //{
//         //     amountBeforeDiscount= (OrignalPrice * quantity);
//         //}
//         amount = amountBeforeDiscount;
//         taxes.IsTax1IncludedInPrice = selectedproductTaxes.IsTax1InclusiveInPrice
//         if (selectedproductTaxes.Tax1Fragment == 2) {
//           taxes.Tax1Fragment = selectedproductTaxes.Tax1Fragment;
//           // taxes.Tax1Amount = Math.round(selectedproductTaxes.Tax1Value, settings.DecimalsInAmount);
//           taxes.Tax1Amount = (settings.IsTaxOnSalesProduct === "false" && !gbt) ? 0 : Number(selectedproductTaxes.Tax1Value?.toFixed(settings.DecimalsInAmount));
//           // console.log("Tax1Amount....1", taxes.Tax1Amount)

//         }
//         else {
//           taxes.Tax1Percentage = selectedproductTaxes.Tax1Value;
//           if (selectedproductTaxes.Tax1Value === 0) {
//             // console.log("selectedproductTaxes..1 Tax1Value")
//             taxes.Tax1Amount = 0;
//           } else {

//             //calcID = selectedproductTaxes.Tax1CalculationID;
//             //rate = selectedproductTaxes.Tax1Value;
//             //disc = selectedproductTaxes.IsTax1InclusiveInPrice ? 0 : discount;

//             //if ((calcID > 0) && (rate > 0))
//             //{

//             //    if ((selectedproductTaxes.IsTax1InclusiveInPrice) && (amount > 0))
//             //        amount = ((amount * 100) / (100 + rate));

//             //    amt = calculateTaxableAmount(calcID, amount, addCharges, disc, taxes.Tax1Amount, taxes.Tax2Amount, totalCharges);

//             //    if (amt > 0 && rate > 0)
//             //        taxes.Tax1Amount = ((amt * rate) / 100);
//             //}

//             calcID = selectedproductTaxes.Tax1CalculationID;
//             rate = selectedproductTaxes.Tax1Value;
//             disc = discount;

//             if ((calcID > 0) && (rate > 0)) {

//               //if ((selectedproductTaxes.IsTax1InclusiveInPrice) && (amount > 0) && (calcID == 9 || calcID == 1) && disc > 0 )
//               //{

//               //    amt = calculateTaxableAmount(calcID, amount, addCharges, disc, taxes.Tax1Amount, taxes.Tax2Amount, totalCharges);
//               //    //amountBeforeDiscount = amt;
//               //    //amount = ((amount * 100) / (100 + rate));

//               //    //amt = amount;
//               //    taxes.Price = amt; //commentedtax
//               //}
//               //else
//               //{
//               disc = selectedproductTaxes.IsTax1InclusiveInPrice === "true" ? 0 : discount;

//               if ((selectedproductTaxes.IsTax1InclusiveInPrice === "true") && (amount > 0))
//                 amount = ((amount * 100) / (100 + rate));

//               if ((calcID === 9 || calcID === 1)) {

//                 if (discountrate > 0 || discountAmount > 0) {
//                   disc = discountrate > 0 ? (amount * discountrate) / 100 : discountAmount;
//                   // amountBeforeDiscount = Math.round(amount, settings.DecimalsInAmount);
//                   amountBeforeDiscount = Number(amount?.toFixed(settings.DecimalsInAmount));
//                   taxes.DiscountAmount = disc;
//                   isAfterDiscountCase = true;
//                 }
//               }

//               // console.log("calculate Taxable Amount 1")
//               amt = calculateTaxableAmount(calcID, amount, addCharges, disc, taxes.Tax1Amount, taxes.Tax2Amount, totalCharges);
//               // console.log("calculate Taxable Amount 1", amt)
//               //}

//               if (amt > 0 && rate > 0 && selectedproductTaxes.IsTax1InclusiveInPrice === "false") {
//                 // taxes.Tax1Amount = Math.round(((amt * rate) / 100), settings.DecimalsInAmount);
//                 taxes.Tax1Amount = (settings.IsTaxOnSalesProduct === "false" && !gbt) ? 0 : Number(((amt * rate) / 100)?.toFixed(4));
//                 // console.log("taxes.Tax1Amount...", taxes.Tax1Amount, (amt * rate) / 100, settings.DecimalsInAmount)
//                 // console.log("Tax1Amount....2", taxes.Tax1Amount)

//               }
//               else {
//                 if (quantity > 0) {
//                   if (OrignalPrice < 1) {
//                     // taxes.Tax1Amount = Math.round((((amt / quantity) * rate) / 100), 4) * quantity;
//                     taxes.Tax1Amount = (settings.IsTaxOnSalesProduct === "false" && !gbt) ? 0 : Number(((((amt / quantity) * rate) / 100) * quantity)?.toFixed(4));
//                     //console.log("Tax1Amount....3", taxes.Tax1Amount)
//                   }
//                   else {
//                     // taxes.Tax1Amount = Math.round(Math.round((((amt / quantity) * rate) / 100), settings.DecimalsInAmount) * quantity, settings.DecimalsInAmount);
//                     //  console.log("Tax1Amount....41", amt, quantity, rate, (((((amt / quantity) * rate) / 100)) * quantity))
//                     taxes.Tax1Amount = (settings.IsTaxOnSalesProduct === "false" && !gbt) ? 0 : Number((((((amt / quantity) * rate) / 100)) * quantity)?.toFixed(4));
//                     // console.log("Math.round(Math.round((((amt / quantity) * rate) / 100), settings.DecimalsInAmount) * quantity, settings.DecimalsInAmount)", (((((amt / quantity) * rate) / 100)) * quantity)?.toFixed(settings.DecimalsInAmount))
//                     //console.log("Tax1Amount....4", taxes.Tax1Amount)
//                   }
//                 }

//               }
//               if ((calcID == 9 || calcID == 1) && disc > 0) {
//                 afterDiscountTax += taxes.Tax1Amount;
//               }
//             }
//           }

//         }

//         if (selectedproductTaxes.IsTax1InclusiveInPrice === "true" && !((calcID == 9 || calcID == 1) && disc > 0))
//           taxAmountIncluded += taxes.Tax1Amount;

//         taxes.Tax1Code = selectedproductTaxes.Tax1Code;
//         taxes.Tax1Name = selectedproductTaxes.Tax1Name;
//       }
//       else {
//         taxes.Tax1Code = "";
//         taxes.Tax1Name = "";
//       }

//       //// Tax2Amount Calculation
//       if (selectedproductTaxes.Tax2Enable && selectedproductTaxes.Tax2Code != "") {
//         amount = amountBeforeDiscount;
//         taxes.IsTax2IncludedInPrice = selectedproductTaxes.IsTax2InclusiveInPrice === "true" ? true : false;
//         if (selectedproductTaxes.Tax2Fragment == 2) {
//           taxes.Tax2Fragment = selectedproductTaxes.Tax2Fragment;
//           taxes.Tax2Amount = selectedproductTaxes.Tax2Value;
//         }
//         else {
//           taxes.Tax2Percentage = selectedproductTaxes.Tax2Value;
//           if (selectedproductTaxes.Tax2Value == 0) { taxes.Tax2Amount = 0; }
//           else {

//             //calcID = selectedproductTaxes.Tax2CalculationID;
//             //rate = selectedproductTaxes.Tax2Value;
//             //disc = selectedproductTaxes.IsTax2InclusiveInPrice ? 0 : discount;

//             //if ((calcID > 0) && (rate > 0))
//             //{

//             //    if ((selectedproductTaxes.IsTax2InclusiveInPrice) && (amount > 0))
//             //        amount = ((amount * 100) / (100 + rate));

//             //    amt = calculateTaxableAmount(calcID, amount, addCharges, disc, taxes.Tax1Amount, taxes.Tax2Amount, totalCharges);

//             //    if (amt > 0 && rate > 0)
//             //        taxes.Tax2Amount = ((amt * rate) / 100);
//             //}
//             calcID = selectedproductTaxes.Tax2CalculationID;
//             rate = selectedproductTaxes.Tax2Value;
//             disc = discount;
//             if ((calcID > 0) && (rate > 0)) {

//               if ((selectedproductTaxes.IsTax2InclusiveInPrice) && (amount > 0) && (calcID == 9 || calcID == 1) && disc > 0) {
//                 // console.log("calculate Taxable Amount 2")
//                 amt = calculateTaxableAmount(calcID, amount, addCharges, disc, taxes.Tax1Amount, taxes.Tax2Amount, totalCharges);
//                 //amountBeforeDiscount = amt;
//                 amount = ((amt * 100) / (100 + rate));
//                 amt = amount;
//                 // taxes.Price = amt; //commentedtax
//               }
//               else {
//                 disc = selectedproductTaxes.IsTax2InclusiveInPrice ? 0 : discount;
//                 if ((selectedproductTaxes.IsTax2InclusiveInPrice) && (amount > 0))
//                   amount = ((amount * 100) / (100 + rate));
//                 // console.log("calculate Taxable Amount 3")
//                 amt = calculateTaxableAmount(calcID, amount, addCharges, disc, taxes.Tax1Amount, taxes.Tax2Amount, totalCharges);
//               }

//               if (amt > 0 && rate > 0)
//                 // taxes.Tax2Amount = Math.round(((amt * rate) / 100), settings.DecimalsInAmount);
//                 taxes.Tax2Amount = Number(((amt * rate) / 100)?.toFixed(settings.DecimalsInAmount));
//             }
//           }

//         }

//         if (selectedproductTaxes.IsTax2InclusiveInPrice)
//           taxAmountIncluded += taxes.Tax2Amount;

//         taxes.Tax2Code = selectedproductTaxes.Tax2Code;
//         taxes.Tax2Name = selectedproductTaxes.Tax2Name;
//       }
//       else {
//         taxes.Tax2Code = "";
//         taxes.Tax2Name = "";
//       }
//     }
//     else {
//       taxes.Tax1Code = "";
//       taxes.Tax1Name = "";
//       taxes.Tax2Code = "";
//       taxes.Tax2Name = "";
//     }

//   }

//   if (taxAmountIncluded > 0 || isAfterDiscountCase) {

//     amountAfterTax = amountBeforeDiscount - taxAmountIncluded;

//     //if (amountAfterTax > 0 /*&& orgQuantity > 0*/)
//     //    taxes.Price = (amountAfterTax /*/ (quantity * currencyRate)*/);
//     if (amountAfterTax > 0 && orgQuantity > 0) {
//       console.log("taxes.Price...4 ", amountAfterTax, quantity, currencyRate)
//       taxes.Price = (amountAfterTax / (quantity * currencyRate));
//       console.log("taxes.Price...4 ", taxes.Price)
//     }
//     else {
//       taxes.Price = 0;
//       // console.log("taxes.Price...6 ", taxes.Price)
//     } //we will not allow to proceed if price is zero

//   }
//   else {
//     amountAfterTax = amountBeforeDiscount + taxes.Tax1Amount;
//     if (discountrate > 0 || discountAmount > 0) {
//       disc = discountrate > 0 ? (amountAfterTax * discountrate) / 100 : discountAmount;

//       taxes.DiscountAmount = disc;

//     }

//   }

//   if (taxAmountIncluded > 0 && OrignalPrice < 1) {
//     //taxes.Price = Math.round(taxes.Price, 4);
//     taxes.Price = Number(taxes.Price?.toFixed(4));
//     // console.log("taxes.Price...22 ", taxes.Price)

//   }
//   else {
//     // console.log("taxes.Price...3.22 ", taxes.Price, settings.DecimalsInAmount)
//     // taxes.Price = Math.round(taxes.Price, settings.DecimalsInAmount);
//     console.log("taxes.Price...321 ", taxes.Price)
//     taxes.Price = Number((taxes.Price).toFixed(4));
//     console.log("taxes.Price...32 ", taxes.Price)
//     // taxes.Price = Math.round(Convert.ToDecimal(taxes.Price.ToString("N6")), 2);

//   }

//   taxes.AfterDiscountTax = afterDiscountTax;
//   taxes.amount = amt
//   taxes.calculationId = calcID
//   return taxes;

// }
// export default calculateTaxeGroups;
import React, {useEffect, useRef, useState} from 'react';
import {getDataById} from '../sqliteHelper';
import {TaxRateParentListTable} from '../sqliteTables/TaxRateParentList';
const calculateTaxableAmount = (
  calcID,
  amount,
  addCharges,
  discount = 0,
  tax1Amount = 0,
  tax2Amount = 0,
  totalCharges = 0,
) => {
  let calcAmount = 0;

  switch (calcID) {
    case 1: // subtotal after discount => on all places subtotal is same
      calcAmount = amount - discount;
      break;
    case 2: // Tax 1 Amount
      calcAmount = tax1Amount;
      break;
    case 3: // Amount before Discount + Tax 1 Amount
      calcAmount = amount - discount + tax1Amount;
      break;

    // Following will be applicable on Invoice Taxes
    case 4: // Expenditures
      calcAmount = totalCharges;
      break;
    case 5: // SubTotal + Expenditures
      calcAmount = amount - discount + totalCharges;
      break;
    case 6: // SubTotal + Expenditures
      calcAmount = amount - discount + totalCharges + tax1Amount;
      break;

    case 7:
      calcAmount = amount - discount + totalCharges + tax1Amount;
      break;
    case 8: // Calculate Before Discount
      calcAmount = amount;
      break;
    case 9: // Calculate After Discount
      calcAmount = amount - discount;
      break;
    default:
      // console.log("Taxsetup.calculateTaxableAmount ; calculation id is not found. calculation is implementing on SubTotal");
      calcAmount = amount - discount;
      break;
  }

  return calcAmount;
};

const calculateTaxeGroups = async (
  quantity,
  price,
  discountAmount,
  taxGroupID,
  currencyRate = 1,
  addCharges = null,
  totalCharges = 0,
  settings = null,
  OrignalPrice = 0,
  discountrate = 0,
  gbt,
) => {
  let taxAmountIncluded = 0,
    amount = 0,
    amountBeforeDiscount = price,
    amountAfterTax = 0,
    selectedproductTaxes,
    amt = 0;
  var taxes = {};

  let orgQuantity = quantity,
    isAfterDiscountCase = false,
    afterDiscountTax = 0;
  taxes.Price = 0;
  if (amountBeforeDiscount > 0 && quantity > 0) {
    taxes.Price = amountBeforeDiscount / (quantity * currencyRate); // amountBeforeDiscount;NEED TO CHANGE ON ADDON
  }

  if (
    taxGroupID === null ||
    taxGroupID === '' ||
    (settings.IsTaxOnSalesProduct === 'false' && !gbt)
  ) {
    taxes.Tax1Code = '';
    taxes.Tax1Name = '';
    taxes.Tax1Amount = 0;
    taxes.Tax2Amount = 0;
    taxes.Tax2Fragment = 0;
    taxes.Tax1Fragment = 0;

    taxes.Tax2Code = '';
    taxes.Tax2Name = '';
    taxes.Price = Number(taxes.Price?.toFixed(settings.DecimalsInAmount));
    return taxes;
  }
  let calcID = 0,
    rate = 0,
    disc = 0;
  if (taxGroupID != '') {
    //var selectedproductTaxes = taxData.Find(x => x.TaxGroupCode == taxGroupID);
    //my side TaxRateParent selectedproductTaxes = manager.TaxRateMasterManager.TaxRateParent_Select(taxGroupID);
    //get selected tax information & calculation methods
    await getDataById(
      TaxRateParentListTable,
      'TaxFamilyCode',
      taxGroupID,
      tax => {
        console.log('tax..........', tax[0]);
        selectedproductTaxes = tax[0];
      },
    );

    // selectedproductTaxes = {
    //   "IsTax2InclusiveInPrice": "false",
    //   "Tax2CalculationID": 0,
    //   "Tax2Value": 0,
    //   "Tax2Fragment": "0",
    //   "NamesTable": "",
    //   "Tax2Name": "",
    //   "Tax2Code": "",
    //   "Tax2Enable": "false",
    //   "IsTax1InclusiveInPrice": "true",
    //   "Tax1Enable": "true",
    //   "TaxFamilyName": "ضريبة منتج",
    //   "Tax1CalculationID": 9,
    //   "Tax1Value": 15,
    //   "Tax1Fragment": 1,
    //   "Tax1Name": "VAT",
    //   "UserCode": 0,
    //   "Tax1Code": "1",
    //   "TaxLevel": 1,
    //   "TaxFamilyCode": "2"
    // }
    if (selectedproductTaxes != null) {
      let discount = 0;
      if (discountAmount > 0) discount = discountAmount;

      taxes.Tax1Enable = selectedproductTaxes.Tax1Enable;
      taxes.Tax2Enable = selectedproductTaxes.Tax2Enable;

      if (
        selectedproductTaxes.Tax1Enable === 'true' &&
        selectedproductTaxes.Tax1Code != ''
      ) {
        amount = amountBeforeDiscount;
        taxes.IsTax1IncludedInPrice =
          selectedproductTaxes.IsTax1InclusiveInPrice;
        if (selectedproductTaxes.Tax1Fragment == 2) {
          taxes.Tax1Fragment = selectedproductTaxes.Tax1Fragment;
          taxes.Tax1Amount =
            settings.IsTaxOnSalesProduct === 'false' && !gbt
              ? 0
              : Number(
                  selectedproductTaxes.Tax1Value?.toFixed(
                    settings.DecimalsInAmount,
                  ),
                );
        } else {
          taxes.Tax1Percentage = selectedproductTaxes.Tax1Value;
          if (selectedproductTaxes.Tax1Value === 0) {
            taxes.Tax1Amount = 0;
          } else {
            calcID = selectedproductTaxes.Tax1CalculationID;
            rate = selectedproductTaxes.Tax1Value;
            disc = discount;

            if (calcID > 0 && rate > 0) {
              disc =
                selectedproductTaxes.IsTax1InclusiveInPrice === 'true'
                  ? 0
                  : discount;

              if (
                selectedproductTaxes.IsTax1InclusiveInPrice === 'true' &&
                amount > 0
              )
                amount = (amount * 100) / (100 + rate);

              if (calcID === 9 || calcID === 1) {
                if (discountrate > 0 || discountAmount > 0) {
                  disc =
                    discountrate > 0
                      ? (amount * discountrate) / 100
                      : discountAmount;
                  amountBeforeDiscount = Number(
                    amount?.toFixed(settings.DecimalsInAmount),
                  );
                  taxes.DiscountAmount = disc;
                  isAfterDiscountCase = true;
                }
              }

              amt = calculateTaxableAmount(
                calcID,
                amount,
                addCharges,
                disc,
                taxes.Tax1Amount,
                taxes.Tax2Amount,
                totalCharges,
              );

              if (
                amt > 0 &&
                rate > 0 &&
                selectedproductTaxes.IsTax1InclusiveInPrice === 'false'
              ) {
                taxes.Tax1Amount =
                  settings.IsTaxOnSalesProduct === 'false' && !gbt
                    ? 0
                    : Number(((amt * rate) / 100)?.toFixed(4));
              } else {
                if (quantity > 0) {
                  if (OrignalPrice < 1) {
                    taxes.Tax1Amount =
                      settings.IsTaxOnSalesProduct === 'false' && !gbt
                        ? 0
                        : Number(
                            (
                              (((amt / quantity) * rate) / 100) *
                              quantity
                            )?.toFixed(4),
                          );
                  } else {
                    taxes.Tax1Amount =
                      settings.IsTaxOnSalesProduct === 'false' && !gbt
                        ? 0
                        : Number(
                            (
                              (((amt / quantity) * rate) / 100) *
                              quantity
                            )?.toFixed(4),
                          );
                  }
                }
              }
              if ((calcID == 9 || calcID == 1) && disc > 0) {
                afterDiscountTax += taxes.Tax1Amount;
              }
            }
          }
        }

        if (
          selectedproductTaxes.IsTax1InclusiveInPrice === 'true' &&
          !((calcID == 9 || calcID == 1) && disc > 0)
        )
          taxAmountIncluded += taxes.Tax1Amount;

        taxes.Tax1Code = selectedproductTaxes.Tax1Code;
        taxes.Tax1Name = selectedproductTaxes.Tax1Name;
      } else {
        taxes.Tax1Code = '';
        taxes.Tax1Name = '';
      }

      if (
        selectedproductTaxes.Tax2Enable === 'true' &&
        selectedproductTaxes.Tax2Code != ''
      ) {
        amount = amountBeforeDiscount;
        taxes.IsTax2IncludedInPrice =
          selectedproductTaxes.IsTax2InclusiveInPrice;
        if (selectedproductTaxes.Tax2Fragment == 2) {
          taxes.Tax2Fragment = selectedproductTaxes.Tax2Fragment;
          taxes.Tax2Amount =
            settings.IsTaxOnSalesProduct === 'false' && !gbt
              ? 0
              : Number(
                  selectedproductTaxes.Tax2Value?.toFixed(
                    settings.DecimalsInAmount,
                  ),
                );
        } else {
          taxes.Tax2Percentage = selectedproductTaxes.Tax2Value;
          if (selectedproductTaxes.Tax2Value === 0) {
            taxes.Tax2Amount = 0;
          } else {
            calcID = selectedproductTaxes.Tax2CalculationID;
            rate = selectedproductTaxes.Tax2Value;
            disc = discount;

            if (calcID > 0 && rate > 0) {
              disc =
                selectedproductTaxes.IsTax2InclusiveInPrice === 'true'
                  ? 0
                  : discount;

              if (
                selectedproductTaxes.IsTax2InclusiveInPrice === 'true' &&
                amount > 0
              )
                amount = (amount * 100) / (100 + rate);

              if (calcID === 9 || calcID === 1) {
                if (discountrate > 0 || discountAmount > 0) {
                  disc =
                    discountrate > 0
                      ? (amount * discountrate) / 100
                      : discountAmount;
                  amountBeforeDiscount = Number(
                    amount?.toFixed(settings.DecimalsInAmount),
                  );
                  taxes.DiscountAmount = disc;
                  isAfterDiscountCase = true;
                }
              }

              amt = calculateTaxableAmount(
                calcID,
                amount,
                addCharges,
                disc,
                taxes.Tax1Amount,
                taxes.Tax2Amount,
                totalCharges,
              );

              if (
                amt > 0 &&
                rate > 0 &&
                selectedproductTaxes.IsTax2InclusiveInPrice === 'false'
              ) {
                taxes.Tax2Amount =
                  settings.IsTaxOnSalesProduct === 'false' && !gbt
                    ? 0
                    : Number(((amt * rate) / 100)?.toFixed(4));
              } else {
                if (quantity > 0) {
                  if (OrignalPrice < 1) {
                    taxes.Tax2Amount =
                      settings.IsTaxOnSalesProduct === 'false' && !gbt
                        ? 0
                        : Number(
                            (
                              (((amt / quantity) * rate) / 100) *
                              quantity
                            )?.toFixed(4),
                          );
                  } else {
                    taxes.Tax2Amount =
                      settings.IsTaxOnSalesProduct === 'false' && !gbt
                        ? 0
                        : Number(
                            (
                              (((amt / quantity) * rate) / 100) *
                              quantity
                            )?.toFixed(4),
                          );
                  }
                }
              }
              if ((calcID == 9 || calcID == 1) && disc > 0) {
                afterDiscountTax += taxes.Tax2Amount;
              }
            }
          }
        }

        if (
          selectedproductTaxes.IsTax2InclusiveInPrice === 'true' &&
          !((calcID == 9 || calcID == 1) && disc > 0)
        )
          taxAmountIncluded += taxes.Tax2Amount;

        taxes.Tax2Code = selectedproductTaxes.Tax2Code;
        taxes.Tax2Name = selectedproductTaxes.Tax2Name;
      } else {
        taxes.Tax2Code = '';
        taxes.Tax2Name = '';
      }
    } else {
      taxes.Tax1Code = '';
      taxes.Tax1Name = '';
      taxes.Tax2Code = '';
      taxes.Tax2Name = '';
    }
  }

  if (taxAmountIncluded > 0 || isAfterDiscountCase) {
    amountAfterTax = amountBeforeDiscount - taxAmountIncluded;

    if (amountAfterTax > 0 && orgQuantity > 0) {
      // console.log('taxes.Price...4 ', amountAfterTax, quantity, currencyRate);
      taxes.Price = amountAfterTax / (quantity * currencyRate);
      // console.log('taxes.Price...4 ', taxes.Price);
    } else {
      taxes.Price = 0;
    } //we will not allow to proceed if price is zero
  } else {
    amountAfterTax = amountBeforeDiscount + taxes.Tax1Amount;
    if (discountrate > 0 || discountAmount > 0) {
      disc =
        discountrate > 0
          ? (amountAfterTax * discountrate) / 100
          : discountAmount;

      taxes.DiscountAmount = disc;
    }
  }

  if (taxAmountIncluded > 0 && OrignalPrice < 1) {
    taxes.Price = Number(taxes.Price?.toFixed(4));
  } else {
    // console.log("taxes.Price...321 ", taxes.Price)
    taxes.Price = Number(taxes.Price.toFixed(4));
    // console.log("taxes.Price...32 ", taxes.Price)
  }
  taxes.AfterDiscountTax = afterDiscountTax;
  taxes.amount = amt;
  taxes.calculationId = calcID;
  return taxes;
};
export default calculateTaxeGroups;

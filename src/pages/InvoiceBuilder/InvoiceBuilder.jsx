import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { Toaster, toast } from 'react-hot-toast';


const InvoiceBuilder = () => {
  // State variables for customer info
  const [customerName, setCustomerName] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [invoiceNumber] = useState('INV-001');
  const [items, setItems] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  // Derived totals (no state)
  const subtotal = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const gst = subtotal * 0.03;
  const grandTotal = subtotal + gst;

  // Handlers for invoice items
  const handleAddItem = () => {
    setItems(prev => [
      ...prev,
      { id: Date.now(), itemName: '', quantity: "", rate: "", amount: 0 },
    ]);
    toast.success('Item added successfully');
  };

  const updateItem = (id, field, value) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id !== id) return item;
        const updatedItem = { ...item, [field]: value };
        const quantity = Number(updatedItem.quantity || 0);
        const rate = Number(updatedItem.rate || 0);
        const amount = quantity * rate;
        return { ...updatedItem, amount };
      })
    );
  };

  // Delete an item
  const handleDeleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast.success('Item removed successfully');
  };

  // Generate Invoice Preview
  const handleGenerateInvoice = () => {
    if (!customerName.trim() || items.length === 0) {
      toast.error('Please enter customer details and add at least one invoice item.');
      return;
    }
    setShowPreview(true);
    toast.success('Invoice generated successfully');
  };
  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="no-print">
        <p className="text-xs font-semibold text-blue-600">
          Invoice Builder
        </p>
        <h1 className="mt-0 text-3xl font-bold tracking-tight text-slate-800">
          Invoice Builder
        </h1>
        <p className="mt-2 text-sm font-normal text-slate-500">
          Create, manage, and generate customer invoices.
        </p>
      </div>

      {/* Customer Information Card */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 no-print">
        <h3 className="text-lg font-semibold text-slate-800 mb-1">
          Customer Information
        </h3>
        <p className="text-sm font-normal text-slate-500 mb-4">
          Enter customer details for invoice generation.
        </p>
        {/* Customer Information Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Customer Name */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="block w-full rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-2.5 text-sm text-slate-800 outline-none transition-all duration-200"
            />
          </div>
          {/* Invoice Date */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Invoice Date
            </label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="block w-full rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-2.5 text-sm text-slate-800 outline-none transition-all duration-200"
            />
          </div>
          {/* Invoice Number */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Invoice Number
            </label>
            <input
              type="text"
              readOnly
              value={invoiceNumber}
              className="block w-full bg-slate-50 rounded-xl border border-slate-200 p-2.5 text-sm text-slate-500 cursor-not-allowed outline-none"
            />
          </div>
        </div>
      </section>

      {/* Invoice Items Card */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 no-print">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Invoice Items</h3>
            <p className="text-sm font-normal text-slate-500">
              Manage invoice line items and pricing details.
            </p>
          </div>
          <button
            className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none transition-all duration-200"
            onClick={handleAddItem}
          >
            Add Item
          </button>
        </div>
      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mt-3">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr className="text-xs font-semibold text-slate-500 text-left">
              <th className="px-5 py-3 w-1/3">Item Name</th>
              <th className="px-5 py-3 w-1/6">Quantity</th>
              <th className="px-5 py-3 w-1/6">Rate</th>
              <th className="px-5 py-3 w-1/5">Amount</th>
              <th className="px-5 py-3 text-center w-12">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-slate-400 text-sm font-normal text-center">No items added yet</td>
              </tr>
              ) : (
                items.map(item => (
                  <tr key={item.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <input
                        type="text"
                        placeholder="Item name / description"
                        value={item.itemName}
                        onChange={e => updateItem(item.id, 'itemName', e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-2 text-sm text-slate-800 outline-none transition-all duration-200"
                      />
                    </td>
                    <td className="px-5 py-3.5">
                      <input
                        type="number"
                        min="1"
                        placeholder="0"
                        value={item.quantity}
                        onChange={e => updateItem(item.id, 'quantity', e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-2 text-sm text-slate-800 outline-none transition-all duration-200"
                      />
                    </td>
                    <td className="px-5 py-3.5">
                      <input
                        type="number"
                        min="0"
                        placeholder="0.00"
                        value={item.rate}
                        onChange={e => updateItem(item.id, 'rate', e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-2 text-sm text-slate-800 outline-none transition-all duration-200"
                      />
                    </td>
                    <td className="px-5 py-3.5 text-left text-sm font-semibold text-slate-800">
                      ₹{item.amount.toFixed(2)}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Invoice Summary Card */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 no-print">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-1">Invoice Summary</h3>
            <p className="text-sm font-normal text-slate-500">
              Review invoice totals before generating the invoice.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none transition-all duration-200"
                onClick={handleGenerateInvoice}
              >
                Generate Invoice
              </button>
              {showPreview && (
                <button
                  type="button"
                  className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none transition-all duration-200"
                  onClick={() => window.print()}
                >
                  Print Invoice
                </button>
              )}
            </div>
          </div>
          <div className="w-full md:w-64 space-y-1.5 text-sm border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Subtotal</span>
              <span className="font-semibold text-slate-800">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">GST (3%)</span>
              <span className="font-semibold text-slate-800">₹{gst.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-200 pt-1.5 flex justify-between font-bold text-slate-900">
              <span>Grand Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </section>
    {showPreview && (
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mt-6 print-container">
        {/* Compact Header */}
        <div className="mb-6 flex justify-between items-start border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">INVOICE</h2>
            <p className="text-xs font-semibold text-blue-600 mt-0.5">Workforce Hub</p>
          </div>
          <div className="text-right space-y-1 text-sm text-slate-600">
            <div>
              <span className="font-semibold text-slate-700">Invoice Number:</span> {invoiceNumber}
            </div>
            <div>
              <span className="font-semibold text-slate-700">Invoice Date:</span> {invoiceDate || 'N/A'}
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="mb-6 text-sm text-slate-600 bg-slate-50/50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Billed To</p>
          <div className="font-semibold text-slate-800 text-base">{customerName || 'N/A'}</div>
        </div>

        {/* Items Table */}
        <div className="mb-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Item Name</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-700 w-24">Quantity</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-700 w-32">Rate</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-700 w-36">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 text-left text-slate-800 font-medium">{item.itemName || 'N/A'}</td>
                    <td className="px-4 py-3 text-right text-slate-600 font-medium">{item.quantity || 0}</td>
                    <td className="px-4 py-3 text-right text-slate-600 font-medium">₹{Number(item.rate || 0).toFixed(2)}</td>
                    <td className="px-4 py-3 text-right text-slate-800 font-semibold">₹{item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <div className="w-64 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Subtotal</span>
              <span className="font-semibold text-slate-800">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">GST (3%)</span>
              <span className="font-semibold text-slate-800">₹{gst.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900 text-base">
              <span>Grand Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </section>
    )}
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
        },
      }}
    />
    </div>
  );
};

export default InvoiceBuilder;



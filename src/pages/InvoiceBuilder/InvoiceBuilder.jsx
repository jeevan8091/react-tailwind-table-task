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
      {/* Header section */}
      <div className="no-print">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
          Invoice Builder
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-800">
          Invoice Builder
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Create, manage, and generate customer invoices.
        </p>
      </div>

      {/* Customer Information Card */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 no-print">
        <h3 className="text-lg font-semibold text-slate-800 mb-1">
          Customer Information
        </h3>
        <p className="text-sm text-slate-600 mb-3">
          Enter customer details for invoice generation.
        </p>
        {/* Customer Information Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2 text-sm"
            />
          </div>
          {/* Invoice Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Invoice Date
            </label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2 text-sm"
            />
          </div>
          {/* Invoice Number */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Invoice Number
            </label>
            <input
              type="text"
              readOnly
              value={invoiceNumber}
              className="block w-full bg-gray-100 rounded-md border border-gray-300 p-2 text-sm cursor-not-allowed"
            />
          </div>
        </div>
      </section>

      {/* Invoice Items Card */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 no-print">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Invoice Items</h3>
            <p className="text-sm text-slate-600">
              Manage invoice line items and pricing details.
            </p>
          </div>
          <button
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
            onClick={handleAddItem}
          >
            Add Item
          </button>
        </div>
        <div className="overflow-x-auto mt-3">
          <table className="w-full border-collapse">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">Item Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">Quantity</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">Rate</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">Amount</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-slate-500 text-sm">No items added yet</td>
                </tr>
              ) : (
                items.map(item => (
                  <tr key={item.id}>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={item.itemName}
                        onChange={e => updateItem(item.id, 'itemName', e.target.value)}
                        className="w-full rounded-md border border-slate-300 p-1 text-sm"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => updateItem(item.id, 'quantity', e.target.value)}
                        className="w-full rounded-md border border-slate-300 p-1 text-sm"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="0"
                        value={item.rate}
                        onChange={e => updateItem(item.id, 'rate', e.target.value)}
                        className="w-full rounded-md border border-slate-300 p-1 text-sm"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        readOnly
                        value={`₹${item.amount.toFixed(2)}`}
                        className="w-full bg-slate-100 text-right font-medium cursor-not-allowed p-1 border border-slate-300 rounded-md text-sm"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <FiTrash2 className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer" onClick={() => handleDeleteItem(item.id)} />
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
            <p className="text-sm text-slate-600">
              Review invoice totals before generating the invoice.
            </p>
            <button
              className="mt-4 inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none"
              onClick={handleGenerateInvoice}
            >
              Generate Invoice
            </button>
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
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mt-6">
        {/* Compact Header */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-800">INVOICE PREVIEW</h3>
          <p className="text-sm text-slate-600">Generated invoice summary and totals.</p>
        </div>

        {/* Customer Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600 border-b border-slate-100 pb-3 mb-4">
          <div>
            <span className="font-semibold text-slate-700">Customer Name:</span> {customerName || 'N/A'}
          </div>
          <div className="md:text-right space-y-1">
            <div>
              <span className="font-semibold text-slate-700">Invoice Date:</span> {invoiceDate || 'N/A'}
            </div>
            <div>
              <span className="font-semibold text-slate-700">Invoice Number:</span> {invoiceNumber}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-2 text-left font-semibold text-slate-700">Item Name</th>
                  <th className="px-4 py-2 text-right font-semibold text-slate-700 w-24">Quantity</th>
                  <th className="px-4 py-2 text-right font-semibold text-slate-700 w-32">Rate</th>
                  <th className="px-4 py-2 text-right font-semibold text-slate-700 w-36">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-2 text-left text-slate-800 font-medium">{item.itemName || 'N/A'}</td>
                    <td className="px-4 py-2 text-right text-slate-600">{item.quantity || 0}</td>
                    <td className="px-4 py-2 text-right text-slate-600">₹{Number(item.rate || 0).toFixed(2)}</td>
                    <td className="px-4 py-2 text-right text-slate-800 font-semibold">₹{item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="flex justify-end pt-3 border-t border-slate-100">
          <div className="w-64 space-y-1.5 text-sm">
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
    )}
    </div>
  );
};

export default InvoiceBuilder;



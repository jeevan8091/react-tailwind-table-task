import React, { useState } from 'react';
import { FiPlusCircle, FiEye, FiSettings, FiFileText, FiTrash2, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const DynamicFormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [newField, setNewField] = useState({ type: 'text', label: '', placeholder: '', options: '' });

  const handleDelete = (index) => {
    const fieldId = fields[index].id;
    setFields(fields.filter((_, i) => i !== index));
    setFormValues(prev => {
      const updated = { ...prev };
      delete updated[fieldId];
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section>
        <p className="text-xs font-semibold text-blue-600">Form Builder</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-800">
          Form Designer
        </h1>
        <p className="mt-2 text-sm font-normal text-slate-500">
          Design custom employee registration fields dynamically.
        </p>
      </section>

      {/* Two‑column responsive layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Form Configuration Card */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 transition-all duration-300 hover:border-blue-600/20 lg:col-span-2">
          <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-800">
            <FiSettings className="h-5 w-5 text-slate-500" />
            Form Configuration
          </h2>
          <p className="text-xs text-slate-500 font-medium mb-3">Fields Configured: {fields.length}</p>
          <div className="flex flex-col space-y-3.5">
            <select
              value={newField.type}
              onChange={e => setNewField({ ...newField, type: e.target.value })}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all duration-200"
            >
              <option value="text">Text Field</option>
              <option value="number">Number Field</option>
              <option value="dropdown">Dropdown Field</option>
              <option value="checkbox">Checkbox Field</option>
            </select>
            <input
              type="text"
              placeholder="Field label"
              value={newField.label}
              onChange={e => setNewField({ ...newField, label: e.target.value })}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all duration-200"
            >
            </input>
            {newField.type !== 'dropdown' ? (
              <input
                type="text"
                placeholder="Placeholder"
                value={newField.placeholder}
                onChange={e => setNewField({ ...newField, placeholder: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all duration-200"
              />
            ) : (
              <input
                type="text"
                placeholder="Options (comma separated)"
                value={newField.options}
                onChange={e => setNewField({ ...newField, options: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all duration-200"
              />
            )}
            <button
              type="button"
              onClick={() => {
                if (newField.label.trim()) {
                  const newId = `${Date.now()}_${Math.random()}`;
                  const processedField = { ...newField, id: newId };
                  if (newField.type === 'dropdown') {
                    processedField.options = newField.options
                      .split(',')
                      .map((opt) => opt.trim())
                      .filter((opt) => opt);
                    // Clear placeholder for dropdown
                    processedField.placeholder = '';
                  }
                  setFields([...fields, processedField]);
                  setFormValues({ ...formValues, [newId]: newField.type === 'checkbox' ? false : '' });
                  setNewField({ type: 'text', label: '', placeholder: '', options: '' });
                }
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none transition-all duration-200"
            >
              <FiPlusCircle className="h-4 w-4" />
              Add Field
            </button>
          </div>
        </section>

        {/* Live Preview Card */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 transition-all duration-300 hover:border-blue-600/20 lg:col-span-3">
          <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-800">
            <FiEye className="h-5 w-5 text-slate-500" />
            Live Preview
          </h2>
          {fields.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[200px] rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-500 p-6">
              <FiFileText className="mb-2 h-5 w-5" />
              <p className="text-slate-500 text-sm font-medium">No fields added yet</p>
              <p className="text-slate-400 text-xs mt-0.5">Start by configuring your first form field.</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {fields.map((field, idx) => (
                <div
                  key={field.id}
                  className="relative bg-slate-50 border border-slate-200 rounded-xl p-4 transition-all duration-200"
                >
                  {/* Delete Icon */}
                  <button
                    type="button"
                    onClick={() => handleDelete(idx)}
                    className="absolute top-2.5 right-2.5 text-slate-400 hover:text-red-600 focus:outline-none transition-colors"
                    aria-label={`Delete ${field.label} field`}
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                  {/* Header with label and badge */}
                  {field.type === 'checkbox' ? (
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        checked={!!formValues[field.id]}
                        onChange={e => setFormValues({ ...formValues, [field.id]: e.target.checked })}
                        id={field.id}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                      />
                      <label htmlFor={field.id} className="text-sm font-medium text-slate-700">{field.label}</label>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-slate-700">{field.label}</label>
                      {field.type === 'dropdown' ? (
                        <select
                          aria-label={field.label}
                          value={formValues[field.id] || ''}
                          onChange={e => setFormValues({ ...formValues, [field.id]: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all duration-200"
                        >
                          {field.options && field.options.length > 0 ? (
                            field.options.map((opt, i) => (
                              <option key={i} value={opt}>{opt}</option>
                            ))
                          ) : (
                            <option value="">{field.placeholder || 'Select an option'}</option>
                          )}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          aria-label={field.label}
                          value={formValues[field.id] || ''}
                          onChange={e => setFormValues({ ...formValues, [field.id]: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all duration-200"
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => {
                if (fields.length === 0) {
                  toast.error('Add at least one field before submitting');
                  return;
                }
                for (const f of fields) {
                  const val = formValues[f.id];
                  if (f.type !== 'checkbox' && (val === undefined || val === '' || val === null)) {
                    toast.error(`Please fill out the "${f.label}" field`);
                    return;
                  }
                }
                const result = {};
                fields.forEach(f => {
                  const val = formValues[f.id];
                  result[f.label] = f.type === 'checkbox' ? (val ? 'Yes' : 'No') : val;
                });
                setSubmittedData(result);
                toast.success('Form submitted successfully');
              }}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none transition-all duration-200"
            >
              Submit Form
            </button>
          </div>
        </section>
      </div>

      {/* Submission Summary */}
      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-blue-600/20 transition-all duration-300">
        <div className="bg-slate-50 border-b border-slate-100 font-semibold text-slate-800 px-5 py-3 text-base">Form Submission Summary</div>
        {submittedData ? (
          <div className="divide-y divide-slate-100">
            {Object.entries(submittedData).map(([label, value]) => (
              <div key={label} className="border-t border-slate-100 py-3 px-5 flex text-sm">
                <div className="flex-1 font-medium text-slate-800">{label}</div>
                <div className="flex-1 text-slate-700">{value}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <FiFileText className="h-5 w-5 mb-2 text-slate-400" />
            <p className="text-slate-500 text-sm font-medium">No form submissions yet</p>
            <p className="text-slate-400 text-xs mt-0.5">Submit the form to view captured values.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default DynamicFormBuilder;

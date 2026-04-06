import React, { useState, useEffect } from "react";

export default function BookPublicationFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: "", subtitle: "", description: "", authors: [{ name: "", affiliation: "" }],
    publicationDate: "", publisher: { name: "", location: "", website: "" },
    edition: "", language: "English", isbn: "", issn: "", subjects: [""],
    bookArea: "Other", level: "National", price: 0, tags: [""], keywords: [""],
    googleBooksLink: "", researchGateLink: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        ...initialData,
        publicationDate: initialData.publicationDate ? new Date(initialData.publicationDate).toISOString().split("T")[0] : "",
      });
    } else if (isOpen && !initialData) {
      setFormData({
        title: "", subtitle: "", description: "", authors: [{ name: "", affiliation: "" }],
        publicationDate: "", publisher: { name: "", location: "", website: "" },
        edition: "", language: "English", isbn: "", issn: "", subjects: [""],
        bookArea: "Other", level: "National", price: 0, tags: [""], keywords: [""],
        googleBooksLink: "", researchGateLink: "",
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [p, c] = name.split(".");
      setFormData(prev => ({ ...prev, [p]: { ...prev[p], [c]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAuthorChange = (index, field, value) => {
    const newAuthors = [...formData.authors];
    newAuthors[index][field] = value;
    setFormData(prev => ({ ...prev, authors: newAuthors }));
  };

  const addAuthor = () => setFormData(prev => ({ ...prev, authors: [...prev.authors, { name: "", affiliation: "" }] }));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err?.message || "Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col my-8 p-8 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6">{initialData ? "Edit Book Publication" : "Add Book Publication"}</h2>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <input required name="title" value={formData.title} onChange={handleChange} className="input" placeholder="Book Title" />
             <input name="subtitle" value={formData.subtitle} onChange={handleChange} className="input" placeholder="Subtitle" />
             <input required type="date" name="publicationDate" value={formData.publicationDate} onChange={handleChange} className="input" />
             <input required name="publisher.name" value={formData.publisher.name} onChange={handleChange} className="input" placeholder="Publisher Name" />
          </div>
          
          <div className="space-y-2">
            <h4 className="font-bold text-slate-700">Authors</h4>
            {formData.authors.map((a, i) => (
              <div key={i} className="flex gap-2">
                <input required value={a.name} onChange={(e) => handleAuthorChange(i, "name", e.target.value)} className="input flex-1" placeholder="Author Name" />
                <input value={a.affiliation} onChange={(e) => handleAuthorChange(i, "affiliation", e.target.value)} className="input flex-1" placeholder="Affiliation" />
              </div>
            ))}
            <button type="button" onClick={addAuthor} className="text-xs text-indigo-600 font-bold">+ Add Author</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <input name="isbn" value={formData.isbn} onChange={handleChange} className="input" placeholder="ISBN" />
             <input name="edition" value={formData.edition} onChange={handleChange} className="input" placeholder="Edition" />
             <select name="level" value={formData.level} onChange={handleChange} className="input">
               <option value="National">National</option>
               <option value="International">International</option>
             </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary">{loading ? "Saving..." : "Save Publication"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { api, defaults, uploadImage } from '../content.js';
import '../admin.css';
const itemSections = ['services', 'projects'];
const isImageField = key => /(image|photo|background|thumbnail)/i.test(key);
function ImageField({ label, value, onChange, csrf, onStatus }) {
  const [uploading, setUploading] = useState(false);
  async function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadImage(file, csrf);
      onChange(result.image_url);
      onStatus(`Uploaded ${file.name}. Save your changes to apply it.`);
    } catch (error) {
      onStatus(error.message || 'Image upload failed');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  }
  return (
    <label className="admin-image-field">
      {label}
      <input
        type="text"
        value={value ?? ''}
        placeholder="Image URL or uploaded image path"
        onChange={e => onChange(e.target.value)}
      />
      <div className="admin-upload-row">
        <label className="admin-file-button">
          {uploading ? 'Uploading...' : 'Choose photo'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            disabled={uploading}
            onChange={handleFile}
          />
        </label>
        <span className="admin-upload-hint">
          JPG, PNG, WebP or GIF · max 5 MB
        </span>
      </div>
      {value && (
        <img
          className="admin-image-preview"
          src={value}
          alt="Selected upload preview"
          onError={e => {
            e.currentTarget.style.display = 'none';
          }}
          onLoad={e => {
            e.currentTarget.style.display = 'block';
          }}
        />
      )}
    </label>
  );
}
export default function Admin() {
  const [auth, setAuth] = useState(false),
    [csrf, setCsrf] = useState(''),
    [login, setLogin] = useState({ username: '', password: '' }),
    [section, setSection] = useState('hero'),
    [sections, setSections] = useState(defaults),
    [items, setItems] = useState({ services: [], projects: [] }),
    [edit, setEdit] = useState(null),
    [status, setStatus] = useState('');
  async function load() {
    const [content, ...lists] = await Promise.all([
      api('content'),
      ...itemSections.map(section => api('items', { section })),
    ]);
    setSections(
      Object.fromEntries(
        Object.keys(defaults).map(k => [
          k,
          { ...defaults[k], ...(content.sections[k] || {}) },
        ])
      )
    );
    setItems(
      Object.fromEntries(itemSections.map((s, i) => [s, lists[i].items]))
    );
  }
  useEffect(() => {
    api('session')
      .then(r => {
        setAuth(r.authenticated);
        setCsrf(r.csrf || '');
        if (r.authenticated) load().catch(e => setStatus(e.message));
      })
      .catch(e => setStatus(e.message));
  }, []);
  async function signIn(e) {
    e.preventDefault();
    try {
      const r = await api('login', { method: 'POST', body: login });
      setAuth(true);
      setCsrf(r.csrf);
      setStatus('Signed in');
      await load();
    } catch (e) {
      setStatus(e.message);
    }
  }
  async function saveSection(e) {
    e.preventDefault();
    try {
      await api('content', {
        method: 'PUT',
        csrf,
        body: { section, content: sections[section] },
      });
      setStatus('Saved ' + section + ' content');
    } catch (e) {
      setStatus(e.message);
    }
  }
  async function saveItem(e) {
    e.preventDefault();
    try {
      await api('items', { method: 'POST', csrf, body: { ...edit, section } });
      setEdit(null);
      await load();
      setStatus('Item saved');
    } catch (e) {
      setStatus(e.message);
    }
  }
  async function deleteItem(item) {
    if (!window.confirm(`Delete ${item.title}?`)) return;
    try {
      await api('items', {
        method: 'DELETE',
        csrf,
        body: { id: item.id, section },
      });
      await load();
      setStatus('Item deleted');
    } catch (e) {
      setStatus(e.message);
    }
  }
  async function logout() {
    try {
      await api('logout', { method: 'POST', csrf });
      setAuth(false);
      setCsrf('');
    } catch (e) {
      setStatus(e.message);
    }
  }
  const updateSectionField = (key, value) =>
    setSections(old => ({
      ...old,
      [section]: { ...old[section], [key]: value },
    }));
  const updateItemField = (key, value) =>
    setEdit(old => ({ ...old, [key]: value }));
  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Constructify / Admin</h1>
        <div>
          <a href="/">View website</a>
          {auth && <button onClick={logout}>Log out</button>}
        </div>
      </header>
      <main className="admin-main">
        {status && (
          <p className="admin-status" role="status">
            {status}
          </p>
        )}
        {!auth ? (
          <form className="admin-panel" onSubmit={signIn}>
            <h2>Admin sign in</h2>
            <label>
              Username
              <input
                required
                autoComplete="username"
                value={login.username}
                onChange={e => setLogin({ ...login, username: e.target.value })}
              />
            </label>
            <label>
              Password
              <input
                required
                type="password"
                autoComplete="current-password"
                value={login.password}
                onChange={e => setLogin({ ...login, password: e.target.value })}
              />
            </label>
            <button type="submit">Sign in</button>
          </form>
        ) : (
          <>
            <nav className="admin-tabs">
              {Object.keys(defaults).map(s => (
                <button
                  type="button"
                  className={s === section ? 'current' : ''}
                  onClick={() => {
                    setSection(s);
                    setEdit(null);
                  }}
                  key={s}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </nav>
            <form className="admin-panel" onSubmit={saveSection}>
              <h2>Edit {section} section</h2>
              <div className="admin-fields">
                {Object.entries(sections[section] || {}).map(([key, value]) => (
                  <React.Fragment key={key}>
                    {isImageField(key) ? (
                      <ImageField
                        label={key.replaceAll('_', ' ')}
                        value={value}
                        csrf={csrf}
                        onStatus={setStatus}
                        onChange={v => updateSectionField(key, v)}
                      />
                    ) : (
                      <label>
                        {key.replaceAll('_', ' ')}
                        {key === 'description' ? (
                          <textarea
                            rows="3"
                            value={value}
                            onChange={e =>
                              updateSectionField(key, e.target.value)
                            }
                          />
                        ) : (
                          <input
                            value={value}
                            onChange={e =>
                              updateSectionField(key, e.target.value)
                            }
                          />
                        )}
                      </label>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <button type="submit">Save section</button>
            </form>
            {itemSections.includes(section) && (
              <div className="admin-panel">
                <div className="admin-heading">
                  <h2>{section} entries</h2>
                  <button
                    type="button"
                    onClick={() =>
                      setEdit({
                        title: '',
                        description: '',
                        category: '',
                        image_url: '',
                        sort_order: 0,
                      })
                    }
                  >
                    + Add new
                  </button>
                </div>
                <div className="admin-list">
                  {items[section].map(item => (
                    <div className="admin-list-row" key={item.id}>
                      <div>
                        {item.image_url && (
                          <img
                            className="admin-list-thumb"
                            src={item.image_url}
                            alt=""
                          />
                        )}
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => setEdit({ ...item })}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="danger"
                          onClick={() => deleteItem(item)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {edit && (
                  <form onSubmit={saveItem} className="admin-item-form">
                    <h3>{edit.id ? 'Edit' : 'Add'} entry</h3>
                    {[
                      'title',
                      'description',
                      'category',
                      'image_url',
                      'sort_order',
                    ].map(key =>
                      isImageField(key) ? (
                        <ImageField
                          key={key}
                          label={key.replaceAll('_', ' ')}
                          value={edit[key] ?? ''}
                          csrf={csrf}
                          onStatus={setStatus}
                          onChange={v => updateItemField(key, v)}
                        />
                      ) : (
                        <label key={key}>
                          {key.replaceAll('_', ' ')}
                          {key === 'description' ? (
                            <textarea
                              rows="3"
                              value={edit[key] ?? ''}
                              onChange={e =>
                                updateItemField(key, e.target.value)
                              }
                            />
                          ) : (
                            <input
                              required={key === 'title'}
                              type={key === 'sort_order' ? 'number' : 'text'}
                              value={edit[key] ?? ''}
                              onChange={e =>
                                updateItemField(key, e.target.value)
                              }
                            />
                          )}
                        </label>
                      )
                    )}
                    <button type="submit">Save entry</button>
                    <button
                      type="button"
                      className="secondary"
                      onClick={() => setEdit(null)}
                    >
                      Cancel
                    </button>
                  </form>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

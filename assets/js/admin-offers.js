// NIVORA — Firestore offers manager
window.NivoraAdminOffers = {
  async create(data){
    if(!window.NivoraFirebase?.enabled) throw new Error("Firebase غير مفعّل");
    return window.NivoraFirebase.saveOffer({...data,active:true});
  },
  async remove(id){ return window.NivoraFirebase.deleteOffer(id); }
};

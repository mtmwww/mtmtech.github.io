#!/usr/bin/python2.7
import glob
import os.path
import sys
class printCat:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def print_(cat, msg):
    print cat + msg + printCat.ENDC

def isIgnored(f):
    keys = [ "404",
            "nav",
            "footer",
            "footer-contact",
            "googlea293c247521688d1",
            "kit-request-thankyou",
            "paypal-badge"]
    for k in keys:
        if(k + ".html" == f): return True
    return False

def testLang(f, lang):
    stat = "<html lang=\"" + lang + "\">"
    for line in open(f):
        if(stat == line.strip()): return True
    print_(printCat.FAIL, stat + " is NOT FOUND")
    return False

def testHreflang(f, lang):
    page = os.path.basename(f)
    if(page == "index.html"): page = ""
    en_stmt = "<link rel=\"alternate\" href=\"/" + page +"\" hreflang=\"en\">"
    zh_stmt = "<link rel=\"alternate\" href=\"/zh-tw/" + page + "\" hreflang=\"zh\">"
    en_found = False
    zh_found = False
    for line in open(f):
        line = line.strip()
        if(not en_found and en_stmt == line): en_found = True
        if(not zh_found and zh_stmt == line): zh_found = True
        if(zh_found and zh_found): return True
    if(not en_found): print_(printCat.FAIL, en_stmt + " is NOT FOUND")
    if(not zh_found): print_(printCat.FAIL, zh_stmt + " is NOT FOUND")
    return False

if __name__ == '__main__':
    result = True
    for f in glob.glob('*.html'):
        if(isIgnored(f)): continue
        print_(printCat.WARNING, f)
        result &= testLang(f, "en")
        result &= testHreflang(f, "en")

    for dirPath, dirNames, fileNames in os.walk("zh-tw"):
        for f in fileNames:
            path = dirPath + "/" + f
            if(isIgnored(f)): continue
            print_(printCat.WARNING, path)
            result &= testLang(path, "zh-Hant")
            result &= testHreflang(path, "zh")

    sys.exit(not result)
